const db = require("../../../utils/db")

export default async (req, res) => {
	try {
		const data = await db.query(`SELECT * FROM products WHERE is_deleted = 0 ORDER BY id DESC`)
		res.json({ data })
	} catch (err) {
		res.status(500).json({ message: "Something went wrong" })
	}
}
