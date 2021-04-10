import { useState, useEffect } from "react"
import App from "next/app"
import Context from "../components/Context"
import { client, requestAccessToken } from "../client"

const ContextWrapper = ({ children }) => {
	const [userData, setUserData] = useState({ isLoading: true })
	// const [products, setProducts] = useState({ isLoading: true })
	const getProfile = async () => {
		const isAuthenticated = await requestAccessToken()
		if (isAuthenticated) {
			const { data: profile } = await client("/api/user/profile")
			setUserData({ ...profile, isLoggedIn: true, isLoading: false })
		} else {
			setUserData({ isLoading: false, isLoggedIn: false })
		}
	}

	useEffect(() => getProfile(), [])
	return <Context.Provider value={{ userData, setUserData }}>{children}</Context.Provider>
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
