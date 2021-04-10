import checkAuth from "../../../middlewares/checkAuth"
const db = require("../../../utils/db")

export default checkAuth(async (req, res) => {
	if (req.method === "GET") {
		try {
			const { user_id } = res.locals.user
			const [profile] = await db.query(
				`
      SELECT 
       id, name, surname, email, isAdmin 
      FROM 
        users 
      WHERE id = ?`,
				[user_id]
			)
			profile.isAdmin = profile.isAdmin === 1
			res.json({ data: profile })
		} catch (error) {
			console.log("PROFILE", error)
			res.status(500).json({ message: "Something went wrong", isSuccess: false })
		}
	}
})
