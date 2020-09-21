import checkAuth from "./checkAuth"
import cookie from "cookie"
export default checkAuth(async (req, res) => {
	res.setHeader(
		"Set-Cookie",
		cookie.serialize("auth", "", {
			httpOnly: true,
			sameSite: "strict",
			path: "/",
		})
	)
	res.status(200).json({ message: "You are logged out!", isSuccess: true })
})
