import { useState, useEffect } from "react"
import styled from "styled-components"
import { createGlobalStyle } from "styled-components"
import AllProducts from "../components/Admin/Product/AllProducts"
import AddProduct from "../components/Admin/Product/AddProduct"
import Orders from "../components/Admin/Order/Orders"
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
	const [screen, setScreen] = useState("orders")
	const [products, setProducts] = useState(null)
	const [orders, setOrders] = useState(null)
	const getProducts = async () => {
		const res = await fetch("/api/admin/products")
		const data = await res.json()
		setProducts(data)
	}
	const getOrders = async () => {
		const res = await fetch("/api/admin/orders")
		const data = await res.json()
		setOrders(data)
	}
	useEffect(() => {
		getProducts()
		getOrders()
	}, [])
	const updateStatus = async (order_id, newStatus, setUpdateOpen) => {
		if (!newStatus) return setUpdateOpen(false)
		const res = await fetch(`/api/admin/orders?order_id=${order_id}&newStatus=${newStatus}`, {
			method: "PUT",
		})
		const json = await res.json()
		if (json.isSuccess) {
			setUpdateOpen(false)
			console.log(json)
			getOrders()
		}
	}
	return (
		<>
			<TopNav />
			<h1>Admin panel</h1>
			<Sidebar setScreen={setScreen} />
			<AdminSection>
				{screen === "orders" ? <Orders orders={orders} updateStatus={updateStatus} /> : null}
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
		return {
			props: {
				data: json,
			},
		}
	}

	return {
		props: {
			data: json,
		},
	}
}
