import { verify } from "jsonwebtoken"
import generateTokens from "../../../utils/generateTokens"
import cookie from "cookie"
const db = require("../../../utils/db")
export default async (req, res) => {
	if (req.method !== "POST") {
		return res.status(400).json({ message: "We only support 'POST'", isSuccess: false })
	}
	try {
		const refreshToken = req.cookies.refreshToken
		if (!refreshToken) return res.status(401).json({ message: "Not authenticated" })
		const { user_id } = verify(refreshToken, process.env.JWT_REFRESH_SECRET)
		const [existingToken] = await db.query(
			`SELECT 
				* 
			FROM 
				refreshTokens
		 	WHERE 
			 	user_id = ? AND token = ?`,
			[user_id, refreshToken]
		)
		console.log(existingToken)
		if (existingToken?.token !== refreshToken) {
			throw new Error("Unauthorized")
		}
		const [user] = await db.query(
			`
			SELECT 
				id as user_id, email, isAdmin 
			FROM 
				users 
			WHERE 
				id = ?`,
			[user_id]
		)
		const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(user)

		await db.query(
			`UPDATE refreshTokens SET token = ? 
			 WHERE user_id = ? AND token = ?`,
			[newRefreshToken, user_id, refreshToken]
		)
		res.setHeader(
			"Set-Cookie",
			cookie.serialize("refreshToken", newRefreshToken, {
				httpOnly: true,
				sameSite: "strict",
				maxAge: 3600 * 24 * 14,
				path: "/",
				secure: process.env.NODE_ENV === "production",
			})
		)

		res.json({ data: newAccessToken })
	} catch (error) {
		console.log("REFRESH TOKEN", error.message)
		return res.status(401).json({ message: "Please log in to continue" })
	}
}
