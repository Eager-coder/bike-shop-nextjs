// import UserContext from "../components/UserContext"
import { useState, useEffect } from "react"
// function MyApp({ Component, pageProps }) {
// 	const [userData, setUserData] = useState({})
// 	useEffect(() => {
// 		const checkLoggedIn = async () => {
// 			const res = await fetch("/api/isTokenValid")
// 			const json = await res.json()
// 			setUserData(json)
// 			console.log(json)
// 		}
// 		checkLoggedIn()
// 	}, [])
// 	return (
// 		<UserContext.Provider value={(userData, setUserData)}>
// 			<Component {...pageProps} />
// 		</UserContext.Provider>
// 	)
// }

// export default MyApp
import UserContext from "../components/UserContext"
const ContextWrapper = ({ children }) => {
	const [userData, setUserData] = useState({})
	useEffect(() => {
		const checkLoggedIn = async () => {
			const res = await fetch("/api/isTokenValid")
			const json = await res.json()
			setUserData(json)
			// console.log(json)
		}
		checkLoggedIn()
	}, [])
	return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>
}

import App from "next/app"

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props
		return (
			<ContextWrapper>
				<Component {...pageProps} />
			</ContextWrapper>
		)
	}
}
export default MyApp
