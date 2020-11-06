const db = require("../db")

export default async (req, res) => {
	try {
		const data = JSON.parse(req.body)
		const { id, name, brand, price, category, type, year, image, description, tech_specs } = data

		if (Object.keys(data).length !== 10)
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
			return res.status(400).json({ message: "Invalid credentials" })
		const update = await db.query(
			`UPDATE products SET name = '${name}', brand = '${brand}', 
			category = '${category}', type = '${type}', price = '${price}', 
			year = '${year}', image = '${image}', description = '${description
				.split("'")
				.join("''")}', tech_specs = '${tech_specs.split("'").join("''")}' WHERE id = ${id}`
		)
		console.log("update product", update)
		if (update) return res.status(200).json({ message: "Item has been updated", isSuccess: true })
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: err })
	}
}
