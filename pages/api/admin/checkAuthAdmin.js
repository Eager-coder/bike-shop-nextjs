import { verify } from "jsonwebtoken"
const checkAuthAdmin = fn => async (req, res) => {
	verify(req.cookies.auth, process.env.JWT_SECRET, (err, decoded) => {
		if (err || !decoded || !decoded.isAdmin) {
			return res.status(401).json({
				message: "Access denied",
				isSuccess: false,
			})
		} else {
			return fn(req, res)
		}
	})
}

export default checkAuthAdmin
