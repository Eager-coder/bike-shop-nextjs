import { verify } from "jsonwebtoken"
const checkAuthAdmin = next => async (req, res) => {
	const accessToken = req.headers.authorization?.split(" ")[1] || null

	verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
		if (err || !decoded || !decoded.isAdmin) {
			return res.status(401).json({
				message: "You are not authenticated",
			})
		} else {
			res.locals = {}
			res.locals.user = decoded
			return next(req, res)
		}
	})
}

export default checkAuthAdmin
