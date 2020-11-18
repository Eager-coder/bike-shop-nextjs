const mysql = require("serverless-mysql")
const db = mysql({
	config: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
	},
})
exports.query = async (query, value) => {
	try {
		console.log("db connection")
		const results = await db.query(query, value)
		await db.end()
		console.log("connection finished")
		return results
	} catch (error) {
		return { error }
	}
}
