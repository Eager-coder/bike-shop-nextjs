import { useState, useEffect, useContext } from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import Link from "next/link"
import { UserContext } from "../components/Context"
import ItemContainer from "../components/cart/ItemContainer"
const CartContainer = styled.div`
	margin: 50px auto;
	width: 100%;
	max-width: 1200px;
	h1 {
		font-size: 2.5rem;
	}
	.cart-container {
		margin: 20px;
	}
`

export default function Cart() {
	const [products, setProducts] = useState([])
	const [total, setTotal] = useState(0)
	const { userData } = useContext(UserContext)
	const getCartItems = async () => {
		const res = await fetch(`/api/user/cart?userId=${userData.id}`, { method: "GET" })
		const json = await res.json()
		console.log(json)
		setProducts(json.data)
	}
	useEffect(() => {
		if (userData.isLoggedIn && !userData.isLoading) getCartItems()
	}, [userData])

	useEffect(() => {
		let totalCount = 0
		for (const item of products) {
			totalCount = totalCount + item.quantity * item.price
		}
		setTotal(totalCount)
	}, [products])

	return (
		<Layout>
			<CartContainer>
				<h1>Shopping cart</h1>
				<div className="cart-container">
					{products.length
						? products.map(e => (
								<ItemContainer
									isLoggedIn={userData.isLoggedIn}
									key={e.id}
									item={e}
									setProducts={setProducts}
									products={products}
								/>
						  ))
						: null}
					<div className="checkout">
						<span>Total: {total}</span>
						<Link href="/checkout">
							<a>Checkout</a>
						</Link>
					</div>
				</div>
			</CartContainer>
		</Layout>
	)
}

// const getItems = async () => {
// 	const cartItems = JSON.parse(localStorage.getItem("cartItems"))
// 	if (cartItems === null || cartItems.length === 0) return console.log("empty")
// 	const productIds = cartItems.map(item => item.productId)
// 	const res = await fetch("/api/cart", {
// 		method: "POST",
// 		body: JSON.stringify(productIds),
// 	})
// 	const data = await res.json()
// 	cartItems.forEach(item => {
// 		data.forEach(elem => {
// 			if (item.productId === elem.id) {
// 				item.image = elem.image
// 				item.price = elem.price
// 				item.name = elem.name
// 			}
// 		})
// 	})
// 	setProducts(cartItems)
// }
