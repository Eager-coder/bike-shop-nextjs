import checkAuth from "../user/checkAuth"
const db = require("../db")
export default checkAuth(async (req, res) => {
	if (req.method === "GET") {
		const orders = await db.query("SELECT * FROM orders")
		const orderItems = await db.query(`
      SELECT name, image, quantity, orderDetails.price, order_id, size
      FROM orderDetails
      LEFT JOIN products ON products.id=orderDetails.product_id
    `)
		console.log(orders, orderItems)

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
		console.log(result)
		return res.json({ message: "Status has been changed!", isSuccess: true })
	}
})
