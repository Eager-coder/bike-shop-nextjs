import checkAuth from "../../../middlewares/checkAuth"
import cookie from "cookie"
const db = require("../../../utils/db")
export default checkAuth(async (req, res) => {
	if (req.method !== "DELETE") {
		return res.status(405).json({
			message: "We only support DELETE",
			isSuccess: false,
		})
	}
	try {
		const { user_id } = res.locals.user
		const refreshToken = req.cookies.refreshToken
		await db.query(
			`
		DELETE FROM 
			refreshTokens 
		WHERE 
			user_id = ? AND token = ?`,
			[user_id, refreshToken]
		)
		res.setHeader(
			"Set-Cookie",
			cookie.serialize("refreshToken", "", {
				httpOnly: true,
				sameSite: "strict",
				path: "/",
				secure: process.env.NODE_ENV === "production",
			})
		)
		res.status(200).json({ message: "You are logged out!", isSuccess: true })
	} catch (error) {
		console.log("LOGOUT", error)
		res.status(500).json({ message: "Something went wrong", isSuccess: false })
	}
})
