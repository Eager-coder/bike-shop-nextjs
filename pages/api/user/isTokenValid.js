import checkAuth from "./checkAuth"
import dbExecute from "../db"
import { verify } from "jsonwebtoken"
import jwt_secret from "../../../jwt_secret"
export default checkAuth(async (req, res) => {
	const userData = verify(req.cookies.auth, jwt_secret)
	const [result] = await dbExecute(
		`SELECT id, email, name, surname FROM users WHERE id = '${userData.id}'`
	)
	const { email, name, surname } = result
	if (result) {
		res.status(200).json({ email, name, surname, isSuccess: true, isLoggedIn: true })
		console.log("logged")
	} else {
		res.status(401).json({ message: "User not found", isSuccess: false })
	}
})
