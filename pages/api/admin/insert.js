const db = require("../../../db")
export default async (req, res) => {
	try {
		const data = JSON.parse(req.body)
		const {
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
		let isEpmty = false
		for (const prop in data) {
			if (
				!data[prop] ||
				data[prop].length === 0 ||
				typeof data[prop] === "undefined" ||
				typeof data[prop] === "null"
			)
				return (isEpmty = true)
		}
		if (Object.keys(data).length !== 9 || isEpmty)
			return res
				.status(400)
				.json({ message: "Please fill all the fields", isSuccess: false })
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
			return res
				.status(400)
				.json({ message: "Invalid credentials", isSuccess: false })
		if (Number(year) > new Date().getFullYear() + 2)
			return res.status(400).json({ message: "Invalid year", isSuccess: false })
		await db.query(
			`INSERT INTO products (name, brand, category, type, price, year, image, description, tech_specs) VALUES
			('${name}', '${brand}', '${category}', '${type}', '${price}', '${year}', '${image}', '${description
				.split("'")
				.join("''")}', '${tech_specs}')`
		)
		res
			.status(201)
			.json({ message: "Item successfully added!", isSuccess: true })
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: "Internal Server Error", isSuccess: false })
	}
}
