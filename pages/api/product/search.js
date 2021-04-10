const db = require("../../../utils/db")

export default async (req, res) => {
	try {
		// make the searched word lowercase and remove all whitespaces
		const word = req?.query?.word.toLowerCase().replace(/\s/g, "")
		if (!word?.trim()) return res.status(404).json({ message: "Not found" })
		const products = await db.query("SELECT * FROM products")
		// retrieve products data and filter by matching the word with products data
		const searchResult = products.filter(item => {
			const { name, brand, type, category } = item
			const string = (name + brand + type + category).toLowerCase().replace(/\s/g, "")
			if (string.includes(word)) return item
		})
		if (!searchResult.length) return res.status(404).json({ data: [], message: "Not found" })
		return res.status(200).json({ data: searchResult })
	} catch (error) {
		console.log("SEARCH", error)
		res.status(500).json({ message: "Something went wrong" })
	}
}
