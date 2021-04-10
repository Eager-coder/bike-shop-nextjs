const db = require("../../../utils/db")
import checkAuth from "../../../middlewares/checkAuth"

export default checkAuth(async (req, res) => {
	if (req.method === "GET") {
		const userId = req.query.userId
		const orders = await db.query(
			`
			SELECT * FROM orders WHERE user_id = ?
			ORDER BY orders.created_at DESC
		`,
			[userId]
		)
		const orderIds = orders.map(item => item.order_id)
		// const items = await db.query(
		// 	`SELECT * FROM orderedProducts WHERE order_id  IN ('${orderIds.join("','")}')`
		// )
		const items = await db.query(
			`
			SELECT orderedProducts.*, name, image FROM orderedProducts, products 
			WHERE products.id = orderedProducts.product_id AND orderedProducts.order_id IN (?)`,
			[orderIds]
		)
		// example of nested loop
		orders.forEach(order => {
			order.items = []
			items.forEach(item => {
				if (item.order_id === order.order_id) {
					order.items.push(item)
				}
			})
		})
		res.json({ data: orders })
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
