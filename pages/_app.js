import { useState, useEffect } from "react"
import App from "next/app"

import UserContext from "../components/UserContext"
import ProductContext from "../components/ProductContext"
import { get } from "js-cookie"
const ContextWrapper = ({ children }) => {
	const [userData, setUserData] = useState({ isLoading: true })
	const [products, setProducts] = useState([])
	useEffect(() => {
		const checkLoggedIn = async () => {
			const res = await fetch("/api/user/isTokenValid")
			const json = await res.json()
			// console.log("cart items: ", json.cartItems)
			setUserData({ ...json, isLoading: false })
		}
		const getProducts = async () => {
			const res = await fetch("/api/getProducts")
			const json = await res.json()
			console.log("all products", json)
			setProducts(json)
		}
		checkLoggedIn()
		getProducts()
	}, [])
	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			<ProductContext.Provider value={{ products }}>{children}</ProductContext.Provider>
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
