const mysql = require("serverless-mysql")
const db = mysql({
	config: {
		host: "freedb.tech",
		user: "freedbtech_Sultan",
		password: "myaccount007",
		database: "freedbtech_Bike_Shop",
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

// config: {
// 	host: "sql7.freemysqlhosting.net",
// 	user: "sql7369675",
// 	password: "KcCL2pbdme",
// 	database: "sql7369675",
// },
