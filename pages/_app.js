import { useState, useEffect } from "react"
import App from "next/app"
import { UserContext } from "../components/Context"
const ContextWrapper = ({ children }) => {
	const [userData, setUserData] = useState({ isLoading: true })
	useEffect(() => {
		const checkLoggedIn = async () => {
			const res = await fetch("/api/user/isTokenValid")
			const json = await res.json()
			setUserData({ ...json, isLoading: false })
		}
		checkLoggedIn()
	}, [])
	return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>
}

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
