import mysql from "mysql2/promise"
import db_info from "../../db_info"
import bcrypt from "bcrypt"

export default async (req, res) => {
	if (req.method === "POST") {
		const { name, surname, email, password } = JSON.parse(req.body)
		console.log(req.body)
		if (!name || !surname || !email || !password)
			return res.status(400).json({ message: "Please fill all the fields!" })
		const connection = await mysql.createConnection(db_info)
		const [result] = await connection.execute(`SELECT email FROM users WHERE email = '${email}'`)
		if (result.length && result[0].email === email) {
			res.status(400).json({ message: "User already exists!" })
		} else {
			const hashedPassword = bcrypt.hashSync(password, 10)
			const newUser = await connection.execute(`INSERT INTO users (name, surname, email, password)
        VALUES ('${name}','${surname}','${email}','${hashedPassword}')`)
			res.status(201).json({ message: "User successfully added!" })
		}
		await connection.end()
	} else {
		res.status(405).json({ message: "We only support POST" })
	}
}
