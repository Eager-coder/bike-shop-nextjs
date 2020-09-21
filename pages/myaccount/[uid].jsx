import { useContext } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import UserContext from "../../components/UserContext"
import Sidebar from "../../components/UserPage/Sidebar"
const AccountSection = styled.div``
export default function YourAccount() {
	const router = useRouter()
	const uid = router.query.uid
	// console.log()
	const { message } = useContext(UserContext).userData || null
	// console.log(userData)
	return (
		<Layout>
			<AccountSection>{message ? <Sidebar name={message.name} link={uid} /> : null}</AccountSection>
		</Layout>
	)
}
