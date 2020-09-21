import checkAuth from "./checkAuth"
import mysql from "mysql2/promise"
import db_info from "../../../db_info"

export default checkAuth(async (req, res) => {
	if (!req.method === "POST")
		return res.status(401).json({ message: "We only support POST!", isSuccess: false })
	const userData = JSON.parse(req.body)
	if (userData.type === "profile") {
		const { email, name, surname, id } = userData.data
		if (!email || !name || !surname)
			return res.status(401).json({ message: "Please fill all the fields!", isSuccess: false })
		const connection = await mysql.createConnection(db_info)
		const [[results]] = await connection.execute(
			`SELECT email, name, surname FROM users WHERE id = '${id}'`
		)
		if (results.email !== email) {
			const [[existingEmail]] = await connection.execute(
				`SELECT email FROM users WHERE email = '${email}'`
			)
			if (existingEmail)
				return res.status(401).json({ message: "Email is already registered!", isSuccess: false })
			const update = await connection.execute(
				`UPDATE users SET name = '${name}', surname = '${surname}', email = '${email}'`
			)
			console.log(update)
			res.status(200).json({ message: "Success!", isSuccess: true })
		}
		await connection.end()
	} else if (userData.type === "password") {
		console.log("fefe")
	} else {
		res.status(401).json({ message: "Something went wrong!", isSuccess: false })
	}
})
