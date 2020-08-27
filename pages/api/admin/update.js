import mysql from "mysql"
import db_info from "../../../db_info"

export default async (req, res) => {
	try {
		const data = JSON.parse(req.body)
		const {
			id,
			name,
			brand,
			price,
			category,
			type,
			year,
			image,
			description,
			tech_specs,
		} = data

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
		const connection = mysql.createConnection(db_info)
		connection.connect()
		connection.query(
			`UPDATE products SET name = '${name}', brand = '${brand}', category = '${category}', type = '${type}', price = '${price}', year = '${year}', image = '${image}', description = '${description
				.split("'")
				.join("''")}', tech_specs = '${tech_specs
				.split("'")
				.join("''")}' WHERE id = ${id}`,
			(error, results, fields) => {
				if (error) {
					console.log("Error: ", error)
					return res.status(500).json({ message: "Something went wrong!" })
				} else {
					return res.status(201).json({ message: "Item added!" })
				}
			}
		)
		connection.end()
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: err })
	}
}
