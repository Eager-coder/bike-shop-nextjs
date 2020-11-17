const db = require("../db")
import bcrypt from "bcrypt"

export default async (req, res) => {
	if (req.method === "POST") {
		const { name, surname, email, password } = JSON.parse(req.body)
		console.log(req.body)
		if (!name || !surname || !email || !password)
			return res.status(400).json({ message: "Please fill all the fields!", isSuccess: false })
		if (password.length < 8)
			return res
				.status(400)
				.json({ message: "Password must be at least 8 characters long", isSuccess: false })
		const result = await db.query(`SELECT email FROM users WHERE email = '${email}'`)
		if (result.length && result[0].email === email) {
			res.status(400).json({ message: "User already exists!", isSuccess: false })
		} else {
			const hashedPassword = bcrypt.hashSync(password, 10)
			await db.query(`INSERT INTO users (name, surname, email, password)
        VALUES ('${name}','${surname}','${email}','${hashedPassword}')`)
			res.status(201).json({ message: "You are signed in!", isSuccess: true })
		}
	} else {
		res.status(405).json({ message: "We only support POST", isSuccess: false })
	}
}
