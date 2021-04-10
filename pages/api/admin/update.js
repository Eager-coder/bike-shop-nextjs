const db = require("../../../utils/db")

export default async (req, res) => {
	if (req.method !== "PUT") {
		return res.status(405).json({ message: "We only support 'PUT'" })
	}
	try {
		const data = req.body
		const { id, name, brand, price, category, type, year, image, description, tech_specs } = data
		let isEmpty = false
		for (const prop in data) {
			if (
				!data[prop] ||
				data[prop].length === 0 ||
				typeof data[prop] === "undefined" ||
				typeof data[prop] === "null"
			)
				isEpmty = true
			break
		}
		if (Object.keys(data).length < 10 || isEmpty)
			return res.status(400).json({ message: "Please fill all the fields" })

		if (
			typeof name !== "string" ||
			typeof brand !== "string" ||
			typeof Number(price) !== "number" ||
			typeof category !== "string" ||
			typeof type !== "string" ||
			typeof Number(year) !== "number" ||
			typeof image !== "string" ||
			typeof description !== "string" ||
			typeof tech_specs !== "string"
		)
			return res.status(400).json({ message: "Invalid data" })
		await db.query(
			`UPDATE products SET name = ?, brand = ?, 
			category = ?, type = ?, price = ?, 
			year = ?, image = ?, description =?,
				tech_specs = ? WHERE id = ?`,
			[name, brand, category, type, price, year, image, description, tech_specs, id]
		)
		res.json({ message: "Item has been updated" })
	} catch (err) {
		console.log("UPDATE PRODICT", err.message)
		res.status(500).json({ message: "Something went wrong" })
	}
}
