import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import Layout from "../components/Layout"
import styled from "styled-components"
import Products from "../components/checkout/Products"
import AddressForm from "../components/checkout/AddressForm"
import Context from "../components/Context"
import Head from "next/head"
import { client } from "../client"
const Container = styled.section`
	width: 100%;
	display: flex;
	justify-content: space-between;
	@media (max-width: 1024px) {
		display: block;
	}
`

export default function Checkout() {
	const { userData } = useContext(Context)
	const [products, setProducts] = useState(null)

	const router = useRouter()
	const getProducts = async () => {
		const { data } = await client(`/api/user/cart`, "GET")
		setProducts(data)
	}
	useEffect(() => {
		if (!userData.isLoading && !userData.isLoggedIn) {
			router.push("/login")
		} else if (!userData.isLoading && userData.isLoggedIn) {
			getProducts()
		}
	}, [userData])

	const stripePromise = loadStripe(
		"pk_test_51HGfGQIig73WQN7K9q09PsnsZ6EkJ3srfB50IoVXuUK5E0lD2U9Uxgb5mHSrsKq8PGAWfR58IVfBFonSw7dAZdWu00jkFR4r2O"
	)
	return userData.isLoggedIn && products ? (
		<Layout>
			<Head>
				<title>Checkout | Focus - Online Bike Shop</title>
			</Head>
			<Container>
				<Products
					products={products}
					total={products.reduce((a, item) => a + item.price * item.quantity, 0)}
				/>
				<Elements stripe={stripePromise}>
					<AddressForm
						products={products}
						total={products.reduce((a, item) => a + item.price * item.quantity, 0)}
						userData={userData}></AddressForm>
				</Elements>
			</Container>
		</Layout>
	) : null
}
