import checkAuth from "./checkAuth"
import dbExecute from "../db"

export default checkAuth(async (req, res) => {
	if (req.method === "POST") {
		const { userId, productId, qty, size } = JSON.parse(req.body).itemData
		if (!userId || !productId || !qty)
			return res.status(301).json({ message: "Please fill all the fields!" })
		const dbResult = await dbExecute(`INSERT INTO cartItem (quantity, product_id, user_id) 
      VALUES ('${qty}', '${productId}', '${userId}')`)
		console.log(dbResult)
		// console.log(itemData)
	} else if (req.method === "PUT") {
		console.log("updates cart item")
	} else if (req.method === "DELETE") {
		console.log("delete cart item")
	}
})
