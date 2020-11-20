// const db = require("../../../db")
// import checkAuthAdmin from "./checkAuthAdmin"

// export default checkAuthAdmin(async (req, res) => {
// 	try {
// 		if (req.method !== "DELETE")
// 			return res.status(400).json({ message: "We only support DELETE" })
// 		const { itemId } = req.query
// 		console.log(itemId)
// 		if (!itemId) return res.status(400).json({ message: "No Item selected" })
// 		const deleteItem = await db.query(`
// 	    DELETE FROM products
// 	    WHERE id = '${itemId}'
// 	  `)
// 		return res.status(200).json({ message: "Item deleted" })
// 	} catch (err) {
// 		console.log(err)
// 		return res.json({ message: err })
// 	}
// })
