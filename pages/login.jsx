import Layout from "../components/Layout"
import styled from "styled-components"
import Link from "next/link"
import { useState } from "react"
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
	const handleSubmit = async e => {
		e.preventDefault()
		const res = await fetch("/api/login", { method: "POST", body: JSON.stringify(userData) })
		const message = await res.json()
		console.log(message)
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
