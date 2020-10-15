import { useState, useEffect, useContext } from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import Link from "next/link"
import Context from "../components/Context"
import ItemContainer from "../components/cart/ItemContainer"
import Loading from "../components/Loading"
const CartContainer = styled.div`
	margin: 50px auto;
	width: 100%;
	max-width: 1200px;
	h1 {
		padding: 20px 0;
		font-size: 2.5rem;
		font-weight: 500;
		text-align: center;
	}
	.items-container {
		margin: 20px;
	}
	.empty {
		margin-top: 100px;
		text-align: center;
		p {
			color: grey;
			margin-bottom: 20px;
		}
		a {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			color: black;
			font-size: 1rem;
			padding: 5px 30px 5px 10px;
			transition: 0.3s;
			border-radius: 3px;
			border: white 2px solid;
			&:hover {
				border: black 2px solid;
				background-color: black;
				color: white;
			}
			&:hover img {
				filter: invert(1);
				transform: translateX(20px);
			}
			img {
				height: 15px;
				margin-left: 10px;
				transition: 0.3s;
			}
		}
	}
	.checkout {
		span {
			font-size: 2rem;
			font-weight: 500;
		}
		.checkout-link {
			margin: 10px 0;
			width: max-content;
			background: black;
			color: white;
			display: block;
			padding: 10px;
			border: black solid 2px;
			border-radius: 7px;
			transition: all 0.3s;
			:hover {
				background: white;
				color: black;
			}
		}
		@media (max-width: 480px) {
		}
	}
`

export default function Cart() {
	const [products, setProducts] = useState([])
	const [total, setTotal] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)
	const { userData } = useContext(Context)
	const getCartItems = async () => {
		const res = await fetch(`/api/user/cart?userId=${userData.id}`, { method: "GET" })
		const json = await res.json()
		console.log("get cart items", json)
		if (json.data) {
			setProducts(json.data)
		}
		setIsLoaded(true)
	}
	useEffect(() => {
		if (userData.isLoggedIn && !userData.isLoading) {
			getCartItems()
		}
	}, [userData])

	useEffect(() => {
		console.log("changed,", products)
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
				{isLoaded ? (
					<div className="items-container">
						{products.length ? (
							<>
								{products.map(e => (
									<ItemContainer
										key={e.id}
										item={e}
										setProducts={setProducts}
										products={products}
									/>
								))}
								<div className="checkout">
									<span>Total: ${total}.00</span>
									<Link href="/checkout">
										<a className="checkout-link">Checkout</a>
									</Link>
								</div>
							</>
						) : (
							<div className="empty">
								<p>Your cart is empty</p>
								<Link href="/">
									<a>
										Go shopping
										<img src="https://img.icons8.com/ios-filled/50/000000/double-right.png" />
									</a>
								</Link>
							</div>
						)}
					</div>
				) : (
					<Loading />
				)}
			</CartContainer>
		</Layout>
	)
}
