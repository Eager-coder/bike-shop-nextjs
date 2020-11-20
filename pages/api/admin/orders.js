import checkAuthAdmin from "./checkAuthAdmin"
const db = require("../../../db")
export default checkAuthAdmin(async (req, res) => {
	try {
		if (req.method === "GET") {
			const orders = await db.query(`
				SELECT  orders.*, users.email, users.name, users.surname
				FROM orders
				INNER JOIN users ON orders.user_id=users.id
				ORDER BY orders.created_at DESC
			`)
			const orderItems = await db.query(`
				SELECT name, image, quantity, orderDetails.price, order_id, size
				FROM orderDetails
				LEFT JOIN products ON products.id=orderDetails.product_id
			`)
			orders.forEach(order => {
				order.items = []
				orderItems.forEach(item => {
					if (item.order_id === order.order_id) {
						order.items.push(item)
					}
				})
			})
			return res.json(orders)
		} else if (req.method === "PUT") {
			const { newStatus, order_id } = req.query
			if (!newStatus || !order_id)
				return res.status(400).json({ message: "Something went wrong!", isSuccess: true })
			const result = await db.query(`
				UPDATE orders SET status = '${newStatus}' WHERE order_id = '${order_id}'
			`)
			return res.json({ message: "Status has been changed!", isSuccess: true })
		}
	} catch (error) {
		console.log(error)
	}
})
