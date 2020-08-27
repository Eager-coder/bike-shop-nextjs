import db_info from "../../db_info"
import mysql from "mysql"

const CartApi = async (req, res) => {
	const ids = JSON.parse(req.body)
	try {
		const connection = mysql.createConnection(db_info)
		connection.connect()
		connection.query(`SELECT * FROM products WHERE id in (${ids})`, (error, results, fields) => {
			if (error) {
				res.status(400).json({ message: "Something went wrong!" })
				console.log(error)
			} else {
				res.status(201).json(results)
			}
		})
		connection.end()
	} catch (err) {
		res.status(500).json(err)
	}
}
export default CartApi
