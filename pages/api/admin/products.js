import mysql from "mysql"
import db_info from "../../../db_info"

export default async (req, res) => {
	try {
		const connection = mysql.createConnection(db_info)
		connection.connect()
		connection.query(`SELECT * FROM products ORDER BY id DESC`, (error, results, fields) => {
			if (error) {
				res.status(400).send(error)
			} else {
				res.status(201).send(results)
			}
		})
		connection.end()
	} catch (err) {
		res.status(500).send(err)
	}
}
