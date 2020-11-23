import { useState } from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"
import Message from "../components/Auth/Message"
import Head from "next/head"
import Loading from "../components/Loading"
const FormContainer = styled.div`
	width: max-content;
	margin: 150px auto;
	h1 {
		margin-bottom: 50px;
	}
	form {
		input {
			border: 1px solid rgb(0, 0, 0, 0.3);
			border-radius: 2px;
			display: block;
			width: 300px;
			height: 40px;
			margin: 10px 0;
			font-size: 1rem;
			padding-left: 10px;
		}
		#btn-submit {
			cursor: pointer;
			background: black;
			border: none;
			color: white;
			padding: 10px 15px;
			border-radius: 4px;
		}
	}
	.have-acc {
		margin-top: 15px;
		a {
			color: #ff4834;
			margin: 0 5px;
		}
	}
`
export default function Signup() {
	const [userData, setUserData] = useState({})
	const [message, setMessage] = useState(null)
	const [isLoading, setLoading] = useState(false)
	const router = useRouter()
	const handleChange = e => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}
	const handleSubmit = async e => {
		setLoading(true)
		e.preventDefault()
		// Check if passwords match
		if (userData.password !== userData.confirmPassword) {
			setMessage("Passwords must match")
			setLoading(false)
		} else {
			// Send auth credentials to the backend
			const res = await fetch("/api/user/signup", {
				method: "POST",
				body: JSON.stringify(userData),
			})
			const json = await res.json()
			if (!json.isSuccess) {
				setLoading(false)
			}
			// Display a message come from the backend
			setMessage(json.message)
			// If success, redirect a user to the login page
			if (json.isSuccess) return router.push("/login")
		}
	}
	return (
		<Layout>
			<Head>
				<title>Sign up | Focus - Online Bike Shop</title>
			</Head>
			{!isLoading ? (
				<FormContainer>
					<h1>Sign up</h1>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							name="name"
							placeholder="First Name"
							onChange={handleChange}
							required
						/>
						<input
							type="text"
							name="surname"
							placeholder="Last Name"
							onChange={handleChange}
							required
						/>
						<input
							type="text"
							name="email"
							placeholder="Email"
							onChange={handleChange}
							required
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							onChange={handleChange}
							required
						/>
						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirm password"
							onChange={handleChange}
							required
						/>
						<Message message={message} />
						<button id="btn-submit" type="submit">
							Sign up
						</button>
					</form>
					<div className="have-acc">
						Have an account?
						<Link href="/login">
							<a>Log in</a>
						</Link>
					</div>
				</FormContainer>
			) : (
				<Loading size="80" />
			)}
		</Layout>
	)
}
