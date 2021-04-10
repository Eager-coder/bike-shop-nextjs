import generateTokens from "../../../utils/generateTokens"
import cookie from "cookie"
const db = require("../../../utils/db")
const bcrypt = require("bcryptjs")

export default async (req, res) => {
	try {
		if (req.method !== "POST") {
			return res.status(405).json({ message: "We only support POST" })
		}
		// email and password of a user is parsed from the request body
		const { name, surname, email, password } = req.body
		// This if statement checks the presence of required credentials.
		if (!name || !surname || !email || !password)
			return res.status(400).json({ message: "Please fill all the fields!" })
		// Checks if password is at least 8 characters long
		if (password.length < 8)
			return res.status(400).json({
				message: "Password must be at least 8 characters long",
			})

		// Checks if the email alerady exists or not
		const [existingUser] = await db.query(
			`SELECT 
			email 
		FROM 
			users 
		WHERE email = '${email}'`
		)
		if (existingUser?.email === email) {
			res.status(400).json({ message: "User already exists!" })
		} else {
			// For security purposes, the password is hashed before being stored
			const hashedPassword = bcrypt.hashSync(password, 10)
			const newUser = await db.query(
				`
			INSERT INTO 
				users (name, surname, email, password)
		  VALUES 
					(?, ?, ?, ?)`,
				[name, surname, email, hashedPassword]
			)
			const { accessToken, refreshToken } = generateTokens({
				user_id: newUser.insertId,
				email,
				isAdmin: false,
			})
			await db.query(
				`
				INSERT INTO 
					refreshTokens (user_id, token) 
				VALUES 
					(?, ?)`,
				[newUser.insertId, refreshToken]
			)
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
			res.status(200).json({ data: accessToken })
		}
	} catch (error) {
		console.log("SIGNUP", error)
		res.status(500).json({ message: "Something went wrong" })
	}
}
