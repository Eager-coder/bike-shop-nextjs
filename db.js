/*The mysql module allows to make connection to 
  the MySQL database remotely */
const mysql = require("serverless-mysql")
const db = mysql({
	/*For security puropses, database information is stored in
	Environment variables */
	config: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
	},
	onConnect: () => console.log("db connected"),
	onClose: () => console.log("connection finished"),
	connUtilization: 0.9,
})

exports.query = async (query, value) => {
	try {
		// load data from the database using a given query
		const results = await db.query(query, value)
		await db.end()
		return results
	} catch (error) {
		// Log error to console and return error message
		console.log(error)
		return { error }
	}
}
