import { useState, useEffect } from "react"
import App from "next/app"
import Context from "../components/Context"
const ContextWrapper = ({ children }) => {
	const [userData, setUserData] = useState({ isLoading: true })
	const [products, setProducts] = useState({ isLoading: true })
	useEffect(() => {
		const checkLoggedIn = async () => {
			const res = await fetch("/api/user/isTokenValid")
			const json = await res.json()
			setUserData({ ...json, isLoading: false })
		}
		const getProducts = async () => {
			const res = await fetch("/api/getProducts")
			const json = await res.json()
			setProducts({ products: json, isLoading: false })
		}
		checkLoggedIn()
		getProducts()
	}, [])
	return (
		<Context.Provider value={{ userData, setUserData, products, setProducts }}>
			{children}
		</Context.Provider>
	)
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
