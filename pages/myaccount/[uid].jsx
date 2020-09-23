import { useContext, useEffect } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import UserContext from "../../components/UserContext"
import Sidebar from "../../components/UserPage/Sidebar"
import Profile from "../../components/UserPage/Profile"
import Orders from "../../components/UserPage/Orders"
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

	useEffect(() => {
		if (!userData.isLoggedIn) router.push("/login")
	}, [])
	return (
		<Layout>
			{userData ? (
				<AccountSection>
					<Sidebar name={userData.name} link={uid} />
					{uid === "profile" ? <Profile user={userData} /> : null}
					{uid === "orders" ? <Orders user={userData} /> : null}
				</AccountSection>
			) : null}
		</Layout>
	)
}
