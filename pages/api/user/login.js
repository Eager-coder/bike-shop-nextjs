const db = require("../db")
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken"
import cookie from "cookie"

export default async (req, res) => {
	console.log(process.env.JWT_SECRET)
	const { email: reqEmail, password: reqPassword } = JSON.parse(req.body)
	if (req.method === "POST") {
		if (!reqEmail || !reqPassword)
			return res.status(400).json({ message: "Please fill all the fields!", isSuccess: false })

		const [result] = await db.query(`SELECT * FROM users WHERE email = '${reqEmail}'`)
		if (!result)
			return res.status(404).json({ message: "Email is not registered!", isSuccess: false })

		const match = await bcrypt.compare(reqPassword, result.password)
		if (match && result.email === reqEmail) {
			const { id, email, name, surname, isAdmin } = result
			const token = sign({ id: result.id }, process.env.JWT_SECRET, { expiresIn: "48h" })
			res.setHeader(
				"Set-Cookie",
				cookie.serialize("auth", token, {
					httpOnly: true,
					sameSite: "strict",
					maxAge: 3600 * 48,
					path: "/",
				})
			)
			res.status(200).json({
				id,
				email,
				name,
				surname,
				isAdmin,
				isLoggedIn: true,
			})
		} else {
			res.status(400).json({ message: "Password is incorrect!", isSuccess: false })
		}
	} else {
		res.status(405).json({ message: "We only support POST", isSuccess: false })
	}
}
