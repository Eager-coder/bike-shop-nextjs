import checkAuth from "./checkAuth"
import dbExecute from "../db"
import bcrypt from "bcrypt"

export default checkAuth(async (req, res) => {
	if (!req.method === "POST")
		return res.status(401).json({ message: "We only support POST!", isSuccess: false })
	const userData = JSON.parse(req.body)
	if (userData.type === "profile") {
		const { newEmail, email, name, surname } = userData.data
		if (!newEmail || !email || !name || !surname)
			return res.status(401).json({ message: "Please fill all the fields!", isSuccess: false })
		const [results] = await dbExecute(
			`SELECT email, name, surname FROM users WHERE email = '${email}'`
		)
		if (results.email !== newEmail) {
			const [existingEmail] = await dbExecute(`SELECT email FROM users WHERE email = '${newEmail}'`)
			if (existingEmail)
				return res.status(401).json({ message: "Email is already registered!", isSuccess: false })
			await dbExecute(
				`UPDATE users SET name = '${name}', surname = '${surname}',
				 email = '${newEmail}' WHERE email = '${email}'`
			)
		} else {
			await dbExecute(
				`UPDATE users SET name = '${name}', surname = '${surname}'
				 WHERE email = '${email}'`
			)
		}
		res.status(200).json({ message: "Profile has been changed!", isSuccess: true })
	} else if (userData.type === "password") {
		const { oldPassword, newPassword, confirmPassword, email } = userData.data
		console.log(userData)
		if (newPassword !== confirmPassword)
			return res.status(401).json({ message: "Passwords must match!", isSuccess: false })
		if (newPassword.length < 8)
			return res
				.status(401)
				.json({ message: "Password must be at least 8 characters long!", isSuccess: false })
		const [results] = await dbExecute(`SELECT password FROM users WHERE email = '${email}'`)
		const isMatch = await bcrypt.compare(oldPassword, results.password)
		console.log("ismatck", isMatch)
		if (!isMatch)
			return res.status(401).json({ message: "Password is not correct", isSuccess: false })
		const hashedPassword = bcrypt.hashSync(newPassword, 10)
		const updatedPassword = await dbExecute(
			`UPDATE users SET password = '${hashedPassword}' WHERE email = '${email}'`
		)
		console.log(updatedPassword)
		return res.status(200).json({ message: "Password has been changed", isSuccess: true })
	} else {
		res.status(401).json({ message: "Something went wrong!", isSuccess: false })
	}
})
