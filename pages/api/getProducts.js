const db = require("./db")

export default async (req, res) => {
	const products = await db.query("SELECT * FROM products")
	res.json({ products })
}
