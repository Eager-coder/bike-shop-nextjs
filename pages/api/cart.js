import dbExecute from "../api/db"

const CartApi = async (req, res) => {
	const ids = JSON.parse(req.body)
	try {
		const results = await dbExecute(`SELECT * FROM products WHERE id in (${ids})`)
		res.status(201).json(results)
	} catch (err) {
		res.status(500).json(err)
	}
}
export default CartApi
