import mysql from "mysql2/promise"
import db_info from "../../db_info"
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken"
const jwt_secret = "8a84ff69-55fa-4a34-a896-b273ee6a8bb3"
const authentication = fn => async (req, res) => {

}
export default async (req, res) => {
	const { email: reqEmail, password: reqPassword } = JSON.parse(req.body)
	if (req.method === "POST") {
		if (!reqEmail || !reqPassword)
			return res.status(400).json({ message: "Please fill all the fields!" })
		const connection = await mysql.createConnection(db_info)
		const [[result]] = await connection.execute(`SELECT * FROM users WHERE email = '${reqEmail}'`)
		await connection.end()
		if (typeof result !== "object")
			return res.status(404).json({ message: "Email or password is incorrect!" })

		const match = await bcrypt.compare(reqPassword, result.password)
		if (match && result.email === reqEmail) {
			const token = sign({ id: result.id }, jwt_secret, { expiresIn: "48h" })
			return res.status(200).json({ message: "Welcome back!", authToken: token })
		} else {
			res.status(400).json({ message: "Email or password is incorrect!" })
		}
	} else {
		res.status(405).json({ message: "We only support POST" })
	}
}
