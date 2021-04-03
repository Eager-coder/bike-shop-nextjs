const db = require("../../../db")
const bcrypt = require("bcrypt")

export default async (req, res) => {
	// Check if the request method is post. If yes, the following lines will be executed
	if (req.method === "POST") {
		// email and password of a user is parsed from the request body
		const { name, surname, email, password } = JSON.parse(req.body)
		// This if statement checks the presence of required credentials.
		if (!name || !surname || !email || !password)
			return res.status(400).json({ message: "Please fill all the fields!", isSuccess: false })
		// Checks if password is at least 8 characters long
		if (password.length < 8)
			return res.status(400).json({
				message: "Password must be at least 8 characters long",
				isSuccess: false,
			})
		const result = await db.query(`SELECT email FROM users WHERE email = '${email}'`)
		// Checks if the email alerady exists or not
		if (result.length && result[0].email === email) {
			res.status(400).json({ message: "User already exists!", isSuccess: false })
		} else {
			// For security purposes, the password is hashed before being stored
			const hashedPassword = bcrypt.hashSync(password, 10)
			await db.query(`INSERT INTO users (name, surname, email, password)
        VALUES ('${name}','${surname}','${email}','${hashedPassword}')`)
			res.status(201).json({ message: "You are signed in!", isSuccess: true })
		}
	} else {
		res.status(405).json({ message: "We only support POST", isSuccess: false })
	}
}
