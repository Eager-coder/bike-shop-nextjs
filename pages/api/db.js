import mysql from "mysql2/promise"

const db_info = {
	host: "remotemysql.com",
	user: "I5eStEOOdg",
	password: "eXIdV6uivM",
	database: "I5eStEOOdg",
}

const dbExecute = async (query, records) => {
	const connection = await mysql.createConnection(db_info)
	const [result] = await connection.query(query, records)
	await connection.end()
	return result
}
export default dbExecute
