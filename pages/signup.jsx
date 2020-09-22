import { useState } from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"
import Message from "../components/Auth/Message"
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
	const router = useRouter()
	const handleChange = e => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}
	const handleSubmit = async e => {
		e.preventDefault()
		if (userData.password !== userData.confirmPassword) return console.log("passwords must match")
		const res = await fetch("/api/user/signup", { method: "POST", body: JSON.stringify(userData) })
		const message = await res.json()
		setMessage(message)
		if (message.isSuccess) return router.push("/")
	}
	return (
		<Layout>
			<FormContainer>
				<h1>Sign up</h1>
				<form onSubmit={handleSubmit}>
					<input type="text" name="name" placeholder="First Name" onChange={handleChange} />
					<input type="text" name="surname" placeholder="Last Name" onChange={handleChange} />
					<input type="text" name="email" placeholder="Email" onChange={handleChange} />
					<input type="password" name="password" placeholder="Password" onChange={handleChange} />
					<input
						type="password"
						name="confirmPassword"
						placeholder="Confirm password"
						onChange={handleChange}
					/>
					{/* <Message message={message} /> */}
					<button type="submit">Sign up</button>
				</form>
				<div>
					Have an account?
					<Link href="/login">
						<a>Log in</a>
					</Link>
				</div>
			</FormContainer>
		</Layout>
	)
}
