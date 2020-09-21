import { useContext } from "react"
import UserContext from "./UserContext"

export default function Logout() {
	const context = useContext(UserContext)
	return console.log(context)
}
