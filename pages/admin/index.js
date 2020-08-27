import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import AllProducts from '../../components/Admin/AllProducts'
import AddProduct from '../../components/Admin/AddProduct'
import UserStats from '../../components/Admin/UserStats'
import Sidebar from '../../components/Admin/Sidebar'
import TopNav from '../../components/Admin/TopNav'
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
	const [screen, setScreen] = useState('userStats')
	const [isProductsLoaded, setProductsLoaded] = useState(false)

	return (
		<>
			<TopNav />
			<h1>Admin panel</h1>
			<Sidebar
				screen={screen}
				setScreen={setScreen}
				setProductsLoaded={setProductsLoaded}
			/>
			<AdminSection>
				{screen === 'userStats' ? <UserStats /> : ''}
				{screen === 'products' ? (
					<AllProducts
						isProductsLoaded={isProductsLoaded}
						setProductsLoaded={setProductsLoaded}
					/>
				) : (
					''
				)}
				{screen === 'createProduct' ? <AddProduct /> : ''}
			</AdminSection>
			<GlobalStyle />
		</>
	)
}
