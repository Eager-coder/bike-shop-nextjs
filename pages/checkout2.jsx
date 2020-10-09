import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import Layout from "../components/Layout"
import styled from "styled-components"
import Products from "../components/checkout/Products"
import AddressForm from "../components/checkout/AddressForm"
import Context from "../components/Context"
const Container = styled.section`
	width: 100%;
	display: flex;
	justify-content: space-between;
`
export default function Checkout() {
	const { userData } = useContext(Context)
	const [products, setProducts] = useState(null)
	const router = useRouter()
	const [address, setAddress] = useState({
		country: "",
		addressLine: "",
		city: "",
		zipCode: "",
		state: "",
	})
	const makeOrder = async id => {
		try {
			const res = await fetch("/api/user/checkout", {
				method: "POST",
				body: JSON.stringify({ id, products, address, userData }),
			})
			console.log(await res.json())
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		if (!userData.isLoading && !userData.isLoggedIn) {
			router.push("/login")
		} else if (!userData.isLoading && userData.isLoggedIn) {
			const getProducts = async () => {
				const res = await fetch(`/api/user/cart?userId=${userData.id}`, { method: "GET" })
				const json = await res.json()
				setProducts(json.data)
				console.log(json.data)
			}
			getProducts()
		}
	}, [userData])
	const stripePromise = loadStripe(
		"pk_test_51HGfGQIig73WQN7K9q09PsnsZ6EkJ3srfB50IoVXuUK5E0lD2U9Uxgb5mHSrsKq8PGAWfR58IVfBFonSw7dAZdWu00jkFR4r2O"
	)
	return userData.isLoggedIn && products ? (
		<Layout>
			<Container>
				<Products
					products={products}
					total={products.reduce((a, item) => a + item.price * item.quantity, 0)}
				/>
				<Elements stripe={stripePromise}>
					<AddressForm
						total={products.reduce((a, item) => a + item.price * item.quantity, 0)}
						address={address}
						setAddress={setAddress}
						makeOrder={makeOrder}></AddressForm>
				</Elements>
			</Container>
		</Layout>
	) : null
}
