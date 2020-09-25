import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import UserContext from "../../components/UserContext"
import Sidebar from "../../components/UserPage/Sidebar"
import Profile from "../../components/UserPage/Profile"
import Orders from "../../components/UserPage/Orders"
import ErrorPage from "../_error"
import Loading from "../../components/Loading"
const AccountSection = styled.div`
	width: 100%;
	padding: 0 50px;
	margin: 100px 0;
	display: flex;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`

export default function YourAccount() {
	const router = useRouter()
	const uid = router.query.uid
	const { userData } = useContext(UserContext)
	const [isReady, setIsReady] = useState(false)
	useEffect(() => {
		if (!userData.isLoading && !userData.isLoggedIn) {
			router.push("/login")
		} else if (!userData.isLoading && userData.isLoggedIn) {
			setIsReady(true)
		}
	}, [userData])
	return uid === "profile" || uid === "orders" ? (
		<Layout>
			{isReady ? (
				<AccountSection>
					<Sidebar name={userData.name} link={uid} />
					{uid === "profile" ? <Profile user={userData} /> : null}
					{uid === "orders" ? <Orders user={userData} /> : null}
				</AccountSection>
			) : (
				<Loading />
			)}
		</Layout>
	) : (
		<ErrorPage />
	)
}
