import Stripe from "stripe"
const stripe = new Stripe(
	"sk_test_51HGfGQIig73WQN7KRiqk3HfGb2jaVH3CKqMbAADDLzyiZWKHldg2Z0VlrOokpHDRKsCxgzRbRPpIQ6FV4w51w1P600cp8qmjwD"
)

export default async (req, res) => {
	const body = JSON.parse(req.body)

	try {
		let productList = {}
		body.products.forEach((item, index) => {
			console.log(item)
			productList[`item${index + 1}`] = `Product name: ${item.name}, Product id: ${
				item.id
			}, Quantity: ${item.qty}, Size: ${item.size ? item.size : "-"}, price: $${item.price}`
		})
		const payment = await stripe.paymentIntents.create({
			amount: body.amount,
			currency: "USD",
			metadata: { ...productList },
			payment_method: body.id,
			confirm: true,
			shipping: {
				name: body.firstName + " " + body.lastName,
				address: {
					line1: "1234 Main Street",
					city: body.city,
					state: body.state,
					country: body.country,
					postal_code: body.zipCode,
				},
			},
		})

		// console.log(productList)
		return res.status(200).json({
			confirm: "Your order has been successfully confirmed.",
		})
	} catch (error) {
		console.log(error)
		return res.status(400).json({
			message: error.message,
		})
	}
}
