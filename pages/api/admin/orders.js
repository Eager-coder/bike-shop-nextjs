import checkAuthAdmin from "../../../middlewares/checkAuthAdmin"
const db = require("../../../utils/db")
export default checkAuthAdmin(async (req, res) => {
	try {
		if (req.method === "GET") {
			const orders = await db.query(`
				SELECT  
					orders.*, users.email, users.name, users.surname
				FROM 
					orders
				INNER JOIN 
					users 
				ON 
					orders.user_id=users.id
				ORDER BY 
					orders.created_at DESC
			`)
			const orderItems = await db.query(`
				SELECT 
					name, image, quantity, orderedProducts.price, order_id, size
				FROM 
					orderedProducts 
				LEFT JOIN 
					products 
				ON 
					products.id = orderedProducts.product_id
			`)
			orders.forEach(order => {
				order.items = []
				orderItems.forEach(item => {
					if (item.order_id === order.order_id) {
						order.items.push(item)
					}
				})
			})
			return res.json({ data: orders })
		} else if (req.method === "PUT") {
			const { newStatus, order_id } = req.query
			if (!newStatus || !order_id) return res.status(400).json({ message: "Something went wrong!" })
			await db.query(
				`
				UPDATE orders SET status = ? WHERE order_id = ?
			`,
				[newStatus, order_id]
			)
			return res.json({ message: "Status has been changed!" })
		}
	} catch (error) {
		console.log(error)
	}
})
