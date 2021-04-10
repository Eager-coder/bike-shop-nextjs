import { useState, useEffect, useContext } from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"
import Context from "../components/Context"
import ItemContainer from "../components/Cart/ItemContainer"
import Loading from "../components/Loading"
import Head from "next/head"
import { client } from "../client"
const CartContainer = styled.div`
	margin: 50px auto;
	width: 100%;
	max-width: 1000px;
	h1 {
		padding: 20px 0;
		font-size: 2.5rem;
		font-weight: 500;
		text-align: center;
		@media (max-width: 768px) {
			font-size: 2rem;
		}
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
		.total {
			font-size: 2rem;
			font-weight: 500;
			@media (max-width: 768px) {
				font-size: 1.4rem;
			}
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
	}
`

export default function Cart() {
	const [products, setProducts] = useState([])
	const [total, setTotal] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)
	const { userData } = useContext(Context)
	const router = useRouter()

	const getCartItems = async () => {
		const { data, ok } = await client("/api/user/cart")
		if (ok && data?.length) {
			setProducts(data)
		} else {
			setProducts([])
		}
		setIsLoaded(true)
	}
	useEffect(() => {
		if (!userData.isLoading && !userData.isLoggedIn) {
			router.push("/login")
		} else if (userData.isLoggedIn && !userData.isLoading) {
			getCartItems()
		}
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
			<Head>
				<title>Cart | Focus - Online Bike Shop</title>
			</Head>
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
										getCartItems={getCartItems}
										products={products}
									/>
								))}
								<div className="checkout">
									<span className="total">Total: ${total}.00</span>
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
					<Loading size="150" />
				)}
			</CartContainer>
		</Layout>
	)
}
