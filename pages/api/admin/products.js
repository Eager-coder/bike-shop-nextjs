import dbExecute from "../db"

export default async (req, res) => {
	try {
		const data = await dbExecute(`SELECT * FROM products ORDER BY id DESC`)
		res.status(201).send(data)
	} catch (err) {
		res.status(500).send(err)
	}
}
