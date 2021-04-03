const db = require("../../db")
const cron = require("node-cron")

cron.schedule("*/10 * * * * *", async () => {
	const res = await db.query("SELECT 2 + 2")
	console.log(res)
})
