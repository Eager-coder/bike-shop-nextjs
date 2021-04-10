import checkAuth from "../../../middlewares/checkAuth"
const db = require("../../../utils/db")

// checkAuth middleware is for checking a user for authentication
export default checkAuth(async (req, res) => {
	if (req.method === "GET") {
		try {
			const { user_id } = res.locals.user
			// Example of an inner join
			const allProducts = await db.query(
				`
				SELECT 
						cartItem.product_id AS product_id, cartItem.id, 
						created_at, size, quantity, name, price, image
				FROM 
						cartItem
				INNER JOIN 
						products 
				ON
						cartItem.product_id = products.id
				WHERE 
						cartItem.user_id = ?
			`,
				[user_id]
			)
			res.json({ data: allProducts })
		} catch (error) {
			console.log("GET CART", error)
			res.status(500).json({ message: "Something went wrong" })
		}
	}
	// POST REQUEST
	if (req.method === "POST") {
		try {
			const { userId, productId, qty, size } = req.body.itemData
			if (!userId || !productId || !qty)
				return res.status(301).json({ message: "Please fill all the fields!" })
			const [existingItem] = await db.query(
				`
				SELECT * from cartItem WHERE user_id = ? AND product_id = ?
			`,
				[userId, productId]
			)
			if (existingItem && existingItem.size === size) {
				const newQty = Number(existingItem.quantity) + Number(qty)
				await db.query(
					`
				UPDATE cartItem SET quantity = ? WHERE id = ?
				`,
					[newQty, existingItem.id]
				)
			} else {
				await db.query(
					`
				INSERT INTO cartItem (quantity, size, product_id, user_id) 
				VALUES (?, ?, ?, ?)
			`,
					[qty, size, productId, userId]
				)
			}
		} catch (error) {
			console.log("POST CART ITEM", error)
			res.status(500).json({ message: "Something went wrong" })
		}
	} else if (req.method === "PUT") {
		try {
			const { itemId, qty } = req.body
			await db.query(`UPDATE cartItem SET quantity = ? WHERE id = ?`, [qty, itemId])
			return res.status(200).json({ data: qty })
		} catch (error) {
			console.log("UPDATE CART ITEM", error)
			res.status(500).json({ message: "Something went wrong" })
		}
	} else if (req.method === "DELETE") {
		try {
			const id = req.query.itemId
			await db.query(`DELETE FROM cartItem WHERE id = ?`, [id])
			return res.json({ message: "Item deleted" })
		} catch (error) {
			console.log("DELETE CART ITEM", error)
			res.status(500).json({ message: "Something went wrong" })
		}
	}
})
