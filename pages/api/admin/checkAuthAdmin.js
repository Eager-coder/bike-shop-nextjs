import { verify } from "jsonwebtoken"
const checkAuthAdmin = fn => async (req, res) => {
	verify(req.cookies.auth, process.env.JWT_SECRET, (err, decoded) => {
		console.log(decoded)
		if (err && !decoded && decoded?.isAdmin !== 1)
			return res.status(401).json({
				message: "Access denied",
				isSuccess: false,
			})
		return fn(req, res)
	})
}

export default checkAuthAdmin
