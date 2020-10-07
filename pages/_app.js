import { useState, useEffect } from "react"
import App from "next/app"
import { UserContext } from "../components/Context"
import Products from "../components/checkout/Products"
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
			setProducts({ products: json.products, isLoading: false })
		}
		checkLoggedIn()
		getProducts()
	}, [])
	return (
		<UserContext.Provider value={{ userData, setUserData, products, setProducts }}>
			{children}
		</UserContext.Provider>
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
