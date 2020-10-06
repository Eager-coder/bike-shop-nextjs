import checkAuth from "./checkAuth"
import dbExecute from "../db"

export default checkAuth(async (req, res) => {
	if (req.method === "GET") {
		const id = req.query.userId
		const allProducts = await dbExecute(`SELECT 
					cartItem.id, createdAt, size, quantity, name, price, image
			FROM 
					cartItem
			INNER JOIN 
					products 
			ON
					cartItem.product_id = products.id
			WHERE 
					cartItem.user_id = '${id}'
		`)
		if (!allProducts) return res.status(400).json({ message: "Cart is empty" })
		res.json({ data: allProducts })
	}
	if (req.method === "POST") {
		const { userId, productId, qty, size } = JSON.parse(req.body).itemData
		if (!userId || !productId || !qty)
			return res.status(301).json({ message: "Please fill all the fields!" })
		const dbResult = await dbExecute(`INSERT INTO cartItem (quantity, size, product_id, user_id) 
      VALUES ('${qty}', '${size}', '${productId}', '${userId}')`)
	} else if (req.method === "PUT") {
		const { itemId, qty } = JSON.parse(req.body)
		const dbResult = await dbExecute(
			`UPDATE cartItem SET quantity = '${qty}' WHERE id = '${itemId}'`
		)

		return res.status(200).json({ isSuccess: true, qty })
	} else if (req.method === "DELETE") {
		const id = req.query.itemId
		const dbResult = await dbExecute(`DELETE FROM cartItem WHERE id = ${id}`)
		return res.json({ isSuccess: true })
	}
})
