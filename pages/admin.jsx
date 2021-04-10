import { useState, useEffect } from "react"
import styled from "styled-components"
import { createGlobalStyle } from "styled-components"
import AllProducts from "../components/Admin/Product/AllProducts"
import AddProduct from "../components/Admin/Product/AddProduct"
import Orders from "../components/Admin/Order/Orders"
import Sidebar from "../components/Admin/Sidebar"
import TopNav from "../components/Admin/TopNav"
import Head from "next/head"
import { useContext } from "react"
import Context from "../components/Context"
import ErrorPage from "./404"
import { client } from "../client"
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
	const [screen, setScreen] = useState("orders")
	const [products, setProducts] = useState(null)
	const [orders, setOrders] = useState(null)
	const { userData } = useContext(Context)

	const getProducts = async () => {
		const { data } = await client("/api/product/all")
		setProducts(data)
	}
	const getOrders = async () => {
		const { data } = await client("/api/admin/orders")
		setOrders(data)
	}
	useEffect(() => {
		getProducts()
		getOrders()
	}, [])

	if (!userData.isAdmin && !userData.isLoading) {
		return <ErrorPage />
	}
	return (
		<>
			<Head>
				<title>Admin Dashboard | Focus - Online Bike Shop</title>
			</Head>
			<TopNav />
			<h1>Admin panel</h1>
			<Sidebar setScreen={setScreen} />
			<AdminSection>
				{screen === "orders" ? <Orders orders={orders} getOrders={getOrders} /> : null}
				{screen === "products" ? (
					<AllProducts products={products} getProducts={getProducts} setProducts={setProducts} />
				) : null}
				{screen === "createProduct" ? <AddProduct getProducts={getProducts} /> : null}
			</AdminSection>
			<GlobalStyle />
		</>
	)
}

// export async function getServerSideProps({ req, res }) {
// 	const cookie = req.headers.cookie
// 	console.log(req.headers)
// 	const response = await fetch(`http://${req.headers.host}/api/user/isTokenValid`, {
// 		headers: { cookie },
// 	})
// 	const json = await response.json()
// 	if (!json.isAdmin) {
// 		res.setHeader("location", "/")
// 		res.statusCode = 302
// 		res.end()
// 		return {
// 			props: {
// 				data: json,
// 			},
// 		}
// 	}
// 	return {
// 		props: {
// 			data: json,
// 		},
// 	}
// }
