import { verify } from "jsonwebtoken"
const checkAuth = fn => async (req, res) => {
	verify(req.cookies.auth, process.env.JWT_SECRET, (err, decoded) => {
		if (err && !decoded) {
			res
				.status(401)
				.json({ message: "You are not authenticated", isSuccess: false, isLoggedIn: false })
		} else {
			fn(req, res)
		}
	})
}

export default checkAuth
