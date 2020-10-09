const mysql = require("serverless-mysql")
const db = mysql({
	config: {
		host: "sql7.freemysqlhosting.net",
		user: "sql7369675",
		password: "KcCL2pbdme",
		database: "sql7369675",
	},
})

exports.query = async (query, value) => {
	try {
		console.log("db connection")
		const results = await db.query(query, value)
		await db.end()
		console.log("finish connection")
		return results
	} catch (error) {
		return { error }
	}
}

// const mysql = require("mysql2/promise")
// const db_info = {
// 	host: "sql7.freemysqlhosting.net",
// 	user: "sql7369675",
// 	password: "KcCL2pbdme",
// 	database: "sql7369675",
// }

// exports.query = async query => {
// 	try {
// 		console.log("db connection")
// 		const connection = await mysql.createConnection(db_info)
// 		const [result] = await connection.execute(query)
// 		await connection.end()
// 		console.log("finish connection")
// 		return result
// 	} catch (error) {
// 		return error
// 	}
// }
