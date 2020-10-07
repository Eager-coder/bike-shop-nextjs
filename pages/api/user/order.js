import dbExecute from "../db"
import checkAuth from "./checkAuth"

export default checkAuth(async (req, res) => {
	if (req.method === "GET") {
		const userId = req.query.userId
		const orders = await dbExecute(`
    SELECT * FROM orders WHERE user_id = '${userId}'
		`)
		const orderIds = orders.map(item => item.order_id)
		const items = await dbExecute(
			`SELECT * FROM orderDetails WHERE order_id  IN ('${orderIds.join("','")}')`
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
	}
})
