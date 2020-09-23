import mysql from "mysql2/promise"

const db_info = {
	host: "remotemysql.com",
	user: "I5eStEOOdg",
	password: "eXIdV6uivM",
	database: "I5eStEOOdg",
}

const dbExecute = async query => {
	const connection = await mysql.createConnection(db_info)
	const [result] = await connection.execute(query)
	await connection.end()
	return result
}
export default dbExecute
