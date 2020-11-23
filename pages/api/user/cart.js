import checkAuth from "./checkAuth"
const db = require("../../../db")

// checkAuth middleware is for checking
// a user for authentication
export default checkAuth(async (req, res) => {
	if (req.method === "GET") {
		const id = req.query.userId
		// Example of an inner join
		const allProducts = await db.query(`SELECT 
						cartItem.product_id AS product_id, cartItem.id, 
						createdAt, size, quantity, name, price, image
				FROM 
						cartItem
				INNER JOIN 
						products 
				ON
						cartItem.product_id = products.id
				WHERE 
						cartItem.user_id = '${id}'
			`)
		if (!allProducts.length)
			return res.status(400).json({ message: "Cart is empty" })
		res.json({ data: allProducts })
	}
	// POST REQUEST
	if (req.method === "POST") {
		const { userId, productId, qty, size } = JSON.parse(req.body).itemData
		if (!userId || !productId || !qty)
			return res.status(301).json({ message: "Please fill all the fields!" })
		const [existingItem] = await db.query(`
				SELECT * from cartItem WHERE user_id = '${userId}' AND product_id = '${productId}'
			`)
		if (existingItem && existingItem.size === size) {
			const newQty = Number(existingItem.quantity) + Number(qty)
			await db.query(
				`UPDATE cartItem SET quantity = '${newQty}' WHERE id = '${existingItem.id}'`
			)
		} else {
			const dbResult = await db.query(`INSERT INTO cartItem (quantity, size, product_id, user_id)
					VALUES ('${qty}', '${size}', '${productId}', '${userId}')
				`)
		}
	} else if (req.method === "PUT") {
		const { itemId, qty } = JSON.parse(req.body)
		const dbResult = await db.query(
			`UPDATE cartItem SET quantity = '${qty}' WHERE id = '${itemId}'`
		)
		return res.status(200).json({ isSuccess: true, qty })
	} else if (req.method === "DELETE") {
		const id = req.query.itemId
		const dbResult = await db.query(`DELETE FROM cartItem WHERE id = ${id}`)
		return res.json({ isSuccess: true })
	}
})
