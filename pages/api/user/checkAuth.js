import { verify } from "jsonwebtoken"
import jwt_secret from "../../../jwt_secret"
const checkAuth = fn => async (req, res) => {
	verify(req.cookies.auth, jwt_secret, (err, decoded) => {
		if (err && !decoded) {
			res.status(401).json({ message: "You are not authenticated", isSuccess: false })
		} else {
			fn(req, res)
		}
	})
}

export default checkAuth
