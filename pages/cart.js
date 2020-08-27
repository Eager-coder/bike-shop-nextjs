import { useState, useEffect } from "react"
import Layout from "../components/Layout"

import styled from "styled-components"
import Link from "next/link"
const CartContainer = styled.div`
	margin: 50px auto;
	width: 100%;
	max-width: 1200px;
	h1 {
		font-size: 2.5rem;
	}
	.cart-container {
		.cart-item {
			display: flex;
			justify-content: space-around;
			border-bottom: 1px black solid;
			margin-bottom: 20px;
			padding-bottom: 20px;
			font-size: 0.9rem;
			img {
				height: 100px;
			}
			.name {
				width: 25%;
			}
			.qty {
				width: 50px;
				font-size: 1.1rem;
				height: 30px;
				padding-left: 7px;
			}
		}
	}
`
export default function Cart() {
	const [products, setProducts] = useState([])
	const [total, setTotal] = useState(0)
	useEffect(() => {
		const getItems = async () => {
			const cartItems = JSON.parse(localStorage.getItem("cartItems"))
			if (cartItems === null || cartItems.length === 0) return console.log("empty")
			const productIds = cartItems.map(item => item.productId)
			const res = await fetch("/api/cart", {
				method: "POST",
				body: JSON.stringify(productIds),
			})
			const data = await res.json()
			cartItems.forEach(item => {
				data.forEach(elem => {
					if (item.productId === elem.id) {
						item.image = elem.image
						item.price = elem.price
						item.name = elem.name
					}
				})
			})

			setProducts(cartItems)
		}
		getItems()
	}, [])
	useEffect(() => {
		let totalCount = 0
		for (const item of products) {
			totalCount = totalCount + item.qty * item.price
			console.log(item.qty * item.price)
		}
		setTotal(totalCount)
	}, [products])
	const changeQty = (e, id) => {
		const updataedItems = products.map(elem => {
			if (elem.id === id) {
				elem.qty = Number(e.target.value)
				return elem
			}
			return elem
		})
		setProducts(updataedItems)
		localStorage.setItem("cartItems", JSON.stringify(updataedItems))
	}
	const removeItem = id => {
		const updatedItems = products.filter(elem => elem.id !== id)
		setProducts(updatedItems)
		localStorage.setItem("cartItems", JSON.stringify(updatedItems))
	}
	return (
		<Layout>
			<CartContainer>
				<h1>Shopping cart</h1>
				<div className="cart-container">
					{products.length
						? products.map(e => (
								<div className="cart-item" key={e.id}>
									<img src={e.image} />
									<div className="name">
										{e.name}
										<div className="size"> {e.size ? "Size: " + e.size : ""}</div>
									</div>
									<label>
										Quantity:
										<input
											className="qty"
											type="number"
											defaultValue={e.qty}
											min="1"
											max="100"
											onChange={event => changeQty(event, e.id)}
										/>
										<br />
										<button onClick={() => removeItem(e.id)}>Remove</button>
									</label>
									<div className="price">Price: ${e.price * e.qty}</div>
								</div>
						  ))
						: ""}
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
