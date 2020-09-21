import checkAuth from "./checkAuth"
import mysql from "mysql2/promise"
import db_info from "../../db_info"
import { verify } from "jsonwebtoken"
import jwt_secret from "../../jwt_secret"
export default checkAuth(async (req, res) => {
	const userData = verify(req.cookies.auth, jwt_secret)
	const connection = await mysql.createConnection(db_info)
	const [[result]] = await connection.execute(
		`SELECT id, email, name, surname FROM users WHERE id = '${userData.id}'`
	)
	await connection.end()
	if (result) {
		res.status(200).json({ message: { ...result }, isLoggedIn: true })
		console.log("logged")
	} else {
		res.status(401).json({ message: "User not found", isLoggedIn: false })
	}
})
