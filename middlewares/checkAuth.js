import { verify } from "jsonwebtoken"

// A middleware function for checking whether a user has signed in or not
const checkAuth = next => async (req, res) => {
	//  The verify function gets JWT access token from cookies and checks
	//  if it is valid by comparing signatures.
	const accessToken = req.headers.authorization?.split(" ")[1] || null
	verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
		if (err && !decoded) {
			res.status(401).json({
				message: "You are not authenticated",
				isSuccess: false,
				isLoggedIn: false,
			})
		} else {
			res.locals = {}
			res.locals.user = decoded
			next(req, res)
		}
	})
}
export default checkAuth
