import { useContext } from "react"
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
`
export default function YourAccount() {
	const router = useRouter()
	const uid = router.query.uid
	const { message } = useContext(UserContext).userData || null
	return (
		<Layout>
			{message ? (
				<AccountSection>
					<Sidebar name={message.name} link={uid} />

					{uid === "profile" ? <Profile user={message} /> : null}
					{uid === "orders" ? <Orders user={message} /> : null}
				</AccountSection>
			) : null}
		</Layout>
	)
}
