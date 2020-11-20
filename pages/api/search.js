const db = require("../../db")

export default async (req, res) => {
	const word = req?.query?.word.toLowerCase().replace(/\s/g, "")
	console.log(word)
	if (!word || !word.length)
		return res.status(300).json({ message: "Not found" })
	const products = await db.query("SELECT * FROM products")
	const searchResult = products.filter(item => {
		const { name, brand, type, category } = item
		const string = (name + brand + type + category)
			.toLowerCase()
			.replace(/\s/g, "")
		if (string.includes(word)) return item
	})
	if (!searchResult.length)
		return res.status(404).json({ searchResult: [], message: "Not found" })
	return res.status(200).json({ searchResult })
}
