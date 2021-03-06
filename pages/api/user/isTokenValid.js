import checkAuth from "../../../middlewares/checkAuth"
const db = require("../../../utils/db")
import { verify } from "jsonwebtoken"
export default checkAuth(async (req, res) => {
	const userData = verify(req.cookies.auth, process.env.JWT_SECRET)
	const [result] = await db.query(
		`SELECT id, email, name, surname, isAdmin FROM users WHERE id = '${userData.id}'`
	)
	const { id, email, name, surname, isAdmin } = result
	console.log("user", result)
	const cartItems = await db.query(`SELECT * FROM cartItem WHERE user_id = '${userData.id}'`)
	if (result) {
		res.status(200).json({ id, email, name, surname, isLoggedIn: true, isAdmin, cartItems })
	} else {
		res.status(401).json({ message: "User not found", isLoggedIn: false })
	}
})
