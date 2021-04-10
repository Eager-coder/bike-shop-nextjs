const db = require("../../../utils/db")
import checkAuthAdmin from "../../../middlewares/checkAuthAdmin"

export default checkAuthAdmin(async (req, res) => {
	try {
		if (req.method !== "DELETE") return res.status(400).json({ message: "We only support DELETE" })
		const { productId } = req.query
		if (!productId) return res.status(400).json({ message: "No Item selected" })

		await db.query(
			`
	    UPDATE products SET is_deleted = 1 
	    WHERE id = ?
	  `,
			[productId]
		)
		return res.status(200).json({ message: "Item deleted" })
	} catch (err) {
		console.log("DELETE ITEM", err.message)
		res.status(500).json({ message: "Something went wrong" })
	}
})
