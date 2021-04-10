import { sign } from "jsonwebtoken"

const generateTokens = user => {
	const { user_id, email, isAdmin } = user

	const accessToken = sign(
		{ user_id, email, isAdmin: isAdmin ? true : false },
		process.env.JWT_ACCESS_SECRET,
		{
			expiresIn: "15m",
		}
	)
	const refreshToken = sign({ user_id, email }, process.env.JWT_REFRESH_SECRET, {
		expiresIn: "14d",
	})

	return { accessToken, refreshToken }
}

export default generateTokens
