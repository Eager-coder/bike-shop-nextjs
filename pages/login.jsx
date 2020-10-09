import Layout from "../components/Layout"
import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useContext, useEffect } from "react"
import Message from "../components/Auth/Message"
import Context from "../components/Context"
const FormContainer = styled.div`
	width: max-content;
	margin: 150px auto;
	form {
		input {
			border: 1px solid rgb(0, 0, 0, 0.3);
			border-radius: 4px;
			display: block;
			width: 250px;
			height: 40px;
			margin: 10px 0;
			font-size: 1rem;
			padding-left: 10px;
		}
	}
`
export default function Signup() {
	const [userData, setUserData] = useState({})
	const [message, setMessage] = useState({})
	const context = useContext(Context)
	const router = useRouter()
	const handleSubmit = async e => {
		e.preventDefault()
		const res = await fetch("/api/user/login", { method: "POST", body: JSON.stringify(userData) })
		const json = await res.json()
		console.log("login:", json)
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
			<FormContainer>
				<h1>Login</h1>
				<form onSubmit={handleSubmit}>
					<input type="text" name="email" placeholder="Email" onChange={handleChange} />
					<input type="password" name="password" placeholder="Password" onChange={handleChange} />
					<button type="submit">Sign up</button>
					<Message message={message.message} isSuccess={message.isSuccess} />
				</form>
				<div>
					Don't have an account?
					<Link href="/signup">
						<a>Sign up</a>
					</Link>
				</div>
			</FormContainer>
		</Layout>
	)
}
