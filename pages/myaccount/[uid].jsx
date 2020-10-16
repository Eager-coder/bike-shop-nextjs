import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import Context from "../../components/Context"
import Sidebar from "../../components/UserPage/Sidebar"
import Profile from "../../components/UserPage/Profile"
import Orders from "../../components/UserPage/Order/Orders"
import ErrorPage from "../_error"
import Loading from "../../components/Loading"

const AccountSection = styled.div`
	width: 100%;
	padding: 0 50px;
	margin: 100px 0;
	display: flex;
	@media (max-width: 768px) {
		flex-direction: column;
		padding: 0 20px;
	}
`

export default function YourAccount() {
	const router = useRouter()
	const uid = router.query.uid
	const { userData } = useContext(Context)
	const [orders, setOrders] = useState([])
	const [isReady, setIsReady] = useState(false)
	const getOrders = async () => {
		const res = await fetch(`/api/user/order?userId=${userData.id}`, { method: "GET" })
		const json = await res.json()
		setOrders(json.orders)
	}
	useEffect(() => {
		if (!userData.isLoading && !userData.isLoggedIn) {
			router.push("/login")
		} else if (!userData.isLoading && userData.isLoggedIn) {
			getOrders()
			setIsReady(true)
		}
	}, [userData])
	return uid === "profile" || uid === "orders" ? (
		<Layout>
			{isReady ? (
				<AccountSection>
					<Sidebar name={userData.name} link={uid} />
					{uid === "profile" ? <Profile user={userData} /> : null}
					{uid === "orders" ? (
						<Orders user={userData} orders={orders} getOrders={getOrders} />
					) : null}
				</AccountSection>
			) : (
				<Loading size="150" />
			)}
		</Layout>
	) : (
		<ErrorPage />
	)
}
