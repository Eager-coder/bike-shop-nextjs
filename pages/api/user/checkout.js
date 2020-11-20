import Stripe from "stripe"
const db = require("../../../db")
import checkAuth from "./checkAuth"
import shortid from "shortid"
const stripe = new Stripe(
	"sk_test_51HGfGQIig73WQN7KRiqk3HfGb2jaVH3CKqMbAADDLzyiZWKHldg2Z0VlrOokpHDRKsCxgzRbRPpIQ6FV4w51w1P600cp8qmjwD"
)
export default checkAuth(async (req, res) => {
	if (req.method === "POST") {
		const { products, userData, address, id } = JSON.parse(req.body)
		const { addressLine, city, state, country, zipCode } = address
		if (!addressLine || !city || !state || !country || !zipCode)
			return res.status(400).json({
				message: "Please fill out all the fields!",
				isSuccess: false,
				isIncomplete: true,
			})
		const total = products.reduce(
			(a, item) => a + item.price * item.quantity,
			0
		)
		try {
			let productList = {}
			products.forEach((item, index) => {
				productList[`Item_${index + 1}`] = `Product name: ${
					item.name
				}, Product id: ${item.id}, Quantity: ${item.quantity}, Size: ${
					item.size ? item.size : "-"
				}, Price: $${item.price}`
			})

			const payment = await stripe.paymentIntents.create({
				amount: total * 100,
				currency: "USD",
				metadata: { ...productList },
				description: userData.name + " " + userData.surname,
				payment_method: id,
				confirm: true,
				shipping: {
					name: userData.name + " " + userData.surname,
					address: {
						line1: addressLine,
						city,
						state,
						country,
						postal_code: zipCode,
					},
				},
			})

			const orderId = shortid()
			const insertOrder = await db.query(`
				INSERT INTO orders (order_id, user_id, total, country, address_line, city, zip_code, state)
				VALUES ('${orderId}', '${userData.id}', '${total}', '${country}','${addressLine}','${city}','${zipCode}', '${state}')`)

			const orderedItems = products
				.map(item => {
					return `('${item.size}', '${item.quantity}', '${item.price}', '${item.product_id}', '${orderId}')`
				})
				.join(", ")
			console.log("ordered items", orderedItems)
			const insertOrderDetails = await db.query(
				`INSERT INTO orderDetails (size, quantity, price, product_id, order_id) VALUES ${orderedItems}`
			)

			return res.status(200).json({
				message: "Order has been successfully confirmed.",
				isSuccess: true,
			})
		} catch (error) {
			console.log(error)
			return res.status(400).json({
				message: error.message,
				isSuccess: false,
			})
		}
	}
})
