const db = require("../../../utils/db")
const bcrypt = require("bcryptjs")
import cookie from "cookie"
import generateTokens from "../../../utils/generateTokens"

export default async (req, res) => {
	// email and password of a user is parsed from the request body
	try {
		const { email: reqEmail, password: reqPassword } = req.body
		if (req.method !== "POST") {
			return res.status(405).json({
				message: "We only support POST",
				isSuccess: false,
			})
		}

		// Returns Error message with status 400 ("Bad request"), if fields are not filled
		if (!reqEmail || !reqPassword)
			return res.status(400).json({
				message: "Please fill all the fields!",
				isSuccess: false,
			})

		//  Checks for the existence of an email in the database
		const [result] = await db.query(`SELECT * FROM users WHERE email = ?`, [reqEmail])
		if (!result)
			return res.status(404).json({
				message: "Email or password is incorrect",
				isSuccess: false,
			})

		/* a password-hashing function "bcrypt" compares the password with
		its hashed version retrieved from the database */
		const match = await bcrypt.compare(reqPassword, result.password)
		if (match && result.email === reqEmail) {
			const { id, email, isAdmin } = result

			// Create and set token to the response header
			const { accessToken, refreshToken } = generateTokens({ user_id: id, email, isAdmin })

			// check if user has got token before and delete it from the db
			const oldToken = req.cookies.refreshToken
			if (req.cookies.refreshToken) {
				await db.query(`DELETE FROM refreshTokens WHERE user_id = ? AND token = ?`, [id, oldToken])
			}
			await db.query(`INSERT INTO 	refreshTokens (user_id, token) VALUES (?, ?)`, [id, refreshToken])

			res.setHeader(
				"Set-Cookie",
				cookie.serialize("refreshToken", refreshToken, {
					httpOnly: true,
					sameSite: "strict",
					maxAge: 3600 * 24 * 14,
					path: "/",
					secure: process.env.NODE_ENV === "production",
				})
			)
			res.status(200).json({
				data: accessToken,
				isSuccess: true,
				isLoggedIn: true,
			})
		} else {
			res.status(400).json({
				message: "Email or password is incorrect",
				isSuccess: false,
			})
		}
	} catch (error) {
		console.log("LOGIN", error.message)
		res.status(500).json({ message: "Something went wrong", isSuccess: false })
	}
}
