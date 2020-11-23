import Layout from "../components/Layout"
import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useContext, useEffect } from "react"
import Message from "../components/Auth/Message"
import Context from "../components/Context"
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
	.no-acc {
		margin-top: 15px;
		a {
			color: #ff4834;
			margin: 0 5px;
		}
	}
`
export default function Signup() {
	const [userData, setUserData] = useState({})
	const [message, setMessage] = useState({})
	const [isLoading, setLoading] = useState(false)
	const context = useContext(Context)
	const router = useRouter()
	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		const res = await fetch("/api/user/login", {
			method: "POST",
			body: JSON.stringify(userData),
		})
		const json = await res.json()
		console.log("login:", json)
		if (!json.isSuccess) {
			setLoading(false)
		}
		setMessage({ message: json.message, isSuccess: json.isSuccess })
		if (json.isLoggedIn) {
			context.setUserData(json)
			router.push("/")
		}
	}
	const handleChange = e => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}
	return (
		<Layout>
			<Head>
				<title>Log in | Focus - Online Bike Shop</title>
			</Head>
			{!isLoading ? (
				<FormContainer>
					<h1>Login</h1>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							name="email"
							placeholder="Email"
							onChange={handleChange}
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							onChange={handleChange}
						/>
						<button id="btn-submit" type="submit">
							Log in
						</button>
						<Message message={message.message} isSuccess={message.isSuccess} />
					</form>

					<div className="no-acc">
						Don't have an account?
						<Link href="/signup">
							<a>Sign up</a>
						</Link>
					</div>
				</FormContainer>
			) : (
				<Loading size="80" />
			)}
		</Layout>
	)
}
