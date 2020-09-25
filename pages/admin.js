import { useState, useEffect } from "react"
import styled from "styled-components"
import { createGlobalStyle } from "styled-components"
import AllProducts from "../components/Admin/AllProducts"
import AddProduct from "../components/Admin/AddProduct"
import UserStats from "../components/Admin/UserStats"
import Sidebar from "../components/Admin/Sidebar"
import TopNav from "../components/Admin/TopNav"
const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		list-style: none;
		text-decoration: none;
		font-family: 'Poppins', sans-serif;
  }
`
const AdminSection = styled.div`
	display: flex;
	justify-content: space-between;
	margin-left: 250px;
	margin-top: 4rem;
	padding: 0 50px;
`

export default function Admin() {
	const [screen, setScreen] = useState("userStats")
	const [products, setProducts] = useState(null)
	useEffect(() => {
		const getProducts = async () => {
			const res = await fetch("/api/admin/products")
			const data = await res.json()
			setProducts(data)
		}
		getProducts()
	}, [])
	return (
		<>
			<TopNav />
			<h1>Admin panel</h1>
			<Sidebar setScreen={setScreen} />
			<AdminSection>
				{screen === "userStats" ? <UserStats /> : null}
				{screen === "products" ? <AllProducts products={products} /> : null}
				{screen === "createProduct" ? <AddProduct /> : null}
			</AdminSection>
			<GlobalStyle />
		</>
	)
}

export async function getServerSideProps({ req, res }) {
	const cookie = req.headers.cookie
	const response = await fetch(`http://${req.headers.host}/api/user/isTokenValid`, {
		headers: { cookie },
	})
	const json = await response.json()
	console.log(json.isAdmin ? "admin" : "not admin")
	if (!json.isAdmin) {
		res.setHeader("location", "/")
		res.statusCode = 302
		res.end()
		return
	}

	return {
		props: {
			data: json,
		},
	}
}