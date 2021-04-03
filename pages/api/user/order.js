const db = require("../../../db")
import checkAuth from "./checkAuth"

export default checkAuth(async (req, res) => {
	if (req.method === "GET") {
		const userId = req.query.userId
		const orders = await db.query(`
			SELECT * FROM orders WHERE user_id = '${userId}'
			ORDER BY orders.created_at DESC
		`)
		const orderIds = orders.map(item => item.order_id)
		const items = await db.query(
			`SELECT * FROM orderedProducts WHERE order_id  IN ('${orderIds.join("','")}')`
		)
		orders.forEach(order => {
			order.items = []
			items.forEach(item => {
				if (item.order_id === order.order_id) {
					order.items.push(item)
				}
			})
		})
		res.json({ orders })
	} else if (req.method === "PUT") {
		const { isComplete, order_id } = req.query
		if (!isComplete || !order_id)
			return res.status(400).json({ message: "Something went wrong!", isSuccess: true })
		const result = await db.query(`
			UPDATE orders SET status = 'completed' WHERE order_id = '${order_id}'
		`)
		return res.json({ message: "Status has been changed!", isSuccess: true })
	}
})
