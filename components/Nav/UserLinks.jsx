import Link from "next/link"
import styled from "styled-components"
import { useState, useContext } from "react"
import Context from "../Context"
import { useRouter } from "next/router"
import SearchField from "./SearchField"
import { client } from "../../client"
const Div = styled.div`
	display: flex;
	align-items: center;
	.cart {
		margin-left: 10px;
		img {
			width: 25px;
			filter: invert(1);
		}
		@media (max-width: 768px) {
			display: none;
		}
	}
`
const UserBox = styled.div`
	.toggler {
		cursor: pointer;
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: ${({ isOpen }) => (isOpen ? "#ff4834" : "#1a1a1a")};
		border-radius: 4px;
		margin-left: 10px;
		img {
			filter: ${({ isOpen }) => (isOpen ? "invert(1)" : "invert(1)")};
			width: 35px;
		}
	}
	.box {
		&::after {
			content: "";
			position: absolute;
			right: 2px;
			top: -15px;
			border-right: 16px solid transparent;
			border-left: 16px solid transparent;
			border-bottom: 16px solid white;
		}
		display: ${({ isOpen }) => (isOpen ? "block" : "none")};
		position: absolute;
		top: 4.5rem;
		right: 20px;
		width: max-content;
		height: max-content;
		padding: 10px 20px;
		border-radius: 4px;
		background: white;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
		div.greeting {
			margin: 15px 0;
			font-size: 1rem;
			font-weight: 500;
			width: max-content;
			width: 200px;
		}
		.cart-section {
			display: none;
			@media (max-width: 768px) {
				display: flex;
				align-items: center;
				width: 100%;
				a {
					font-size: 1rem;
					color: black;
				}
				img {
					width: 15px;
					height: 15px;
					margin-right: 10px;
				}
			}
		}
		hr {
			background: #ff4834;
			border: none;
			height: 2px;
		}
		> a {
			display: block;
			margin: 10px 0;
			font-weight: 400;
			font-size: 0.9rem;
			color: black;
			:hover {
				color: #ff4834;
				text-decoration: underline;
			}
		}
		button {
			cursor: pointer;
			margin: 10px 0;
			display: flex;
			align-items: center;
			background: white;
			border: 2px solid black;
			border-radius: 4px;
			padding: 5px;
			span {
				color: black;
			}
			:hover span {
			}
			img {
				margin-left: 5px;
				width: 15px;
				height: auto;
			}
		}
	}
`
export default function UserLinks() {
	const [isUserBoxOpen, setIsUserBoxOpen] = useState(false)
	const { userData, setUserData } = useContext(Context)
	const router = useRouter()
	const signOut = async () => {
		await client("/api/auth/logout", "DELETE")

		setUserData({ isLoading: false, isLoggedIn: false })
		localStorage.removeItem("accessToken")
		router.push("/login")
	}
	return (
		<Div>
			<SearchField />
			<Link href="/cart" passHref>
				<a className="cart">
					<img src="https://focus-bike-shop.vercel.app/icons/cart.svg" />
				</a>
			</Link>
			<UserBox isOpen={isUserBoxOpen}>
				<div className="toggler">
					<img
						onClick={() => setIsUserBoxOpen(!isUserBoxOpen)}
						src="https://img.icons8.com/small/96/000000/user.png"
					/>
				</div>
				<div className="box">
					{userData.isLoggedIn ? (
						<>
							<div className="greeting">Welcome back, {userData.name}!</div>
							<div className="cart-section">
								<Link href="/cart" passHref>
									<a>
										<img src="https://focus-bike-shop.vercel.app/icons/cart.svg" />
										Go to cart
									</a>
								</Link>
							</div>
							<Link href="/myaccount/[uid]" as="/myaccount/profile" passHref>
								<a>Your account</a>
							</Link>
							<Link href="/myaccount/[uid]" as="/myaccount/orders" passHref>
								<a>Order history</a>
							</Link>
							{userData.isAdmin ? (
								<Link href="/admin">
									<a>Admin dashboard</a>
								</Link>
							) : null}
							<hr />
							<button onClick={signOut}>
								<span>Log out</span>
								<img src="/icons/logout.svg" alt="" />
							</button>
						</>
					) : (
						<>
							<Link href="/signup">
								<a>Sign up</a>
							</Link>
							<Link href="/login">
								<a>Log in</a>
							</Link>
						</>
					)}
				</div>
			</UserBox>
		</Div>
	)
}
