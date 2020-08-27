import mysql from "mysql"

const db_info = {
	host: "remotemysql.com",
	user: "I5eStEOOdg",
	password: "eXIdV6uivM",
	database: "I5eStEOOdg",
}

export default async (req, res) => {
	try {
		const data = JSON.parse(req.body)
		const { name, brand, price, category, type, year, image, description, tech_specs } = data
		let isEpmty = false
		for (const prop in data) {
			if (
				data[prop].length === 0 ||
				typeof data[prop] === "undefined" ||
				typeof data[prop] === "null"
			)
				return (isEpmty = true)
		}
		if (Object.keys(data).length !== 9 || isEpmty)
			return res.status(400).json({ message: "Please fill all the fields", status: 400 })
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
			return res.status(400).json({ message: "Invalid credentials", status: 400 })
		const connection = mysql.createConnection(db_info)
		connection.connect()
		connection.query(
			`INSERT INTO products (name, brand, category, type, price, year, image, description, tech_specs) VALUES
			('${name}', '${brand}', '${category}', '${type}', '${price}', '${year}', '${image}', '${description
				.split("'")
				.join("''")}', '${tech_specs}')`,
			(error, results, fields) => {
				if (error) {
					console.log(error)
					res.status(500).json({ message: "Something went wrong!", status: 400 })
				} else {
					res.status(201).json({ message: "Item added!", status: 201 })
					console.log("~~Item added~~")
				}
			}
		)
		connection.end()
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: err, status: 400 })
	}
}
