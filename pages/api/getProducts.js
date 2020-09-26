import dbExecute from "./db"

export default async (req, res) => {
	const products = await dbExecute("SELECT * FROM products")
	res.json({ products })
}
