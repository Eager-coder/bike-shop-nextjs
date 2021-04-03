const db = require("../../../db")
const bcrypt = require("bcryptjs")
import { sign } from "jsonwebtoken"
import cookie from "cookie"

export default async (req, res) => {
	// email and password of a user is parsed from the request body
	const { email: reqEmail, password: reqPassword } = JSON.parse(req.body)

	/* An example of a nested loop. First, it checks if the request method is post. 
	If yes, the following lines will be executed */
	if (req.method === "POST") {
		// Returns status 400 ("Bad request"), if fields are not filled
		if (!reqEmail || !reqPassword)
			return res.status(400).json({
				message: "Please fill all the fields!",
				isSuccess: false,
			})

		//  Checks for the existence of an email in the database
		const [result] = await db.query(`SELECT * FROM users WHERE email = '${reqEmail}'`)
		if (!result)
			return res.status(404).json({
				message: "Email is not registered!",
				isSuccess: false,
			})

		/* a password-hashing function "bcrypt" compares the password with
		its hashed version retrieved from the database */
		const match = await bcrypt.compare(reqPassword, result.password)
		if (match && result.email === reqEmail) {
			const { id, email, name, surname, isAdmin } = result

			// Create and set token to the response header
			const token = sign({ id: result.id, isAdmin }, process.env.JWT_SECRET, {
				expiresIn: "48h",
			})
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
			res.status(400).json({
				message: "Password is incorrect!",
				isSuccess: false,
			})
		}
	} else {
		res.status(405).json({
			message: "We only support POST",
			isSuccess: false,
		})
	}
}
