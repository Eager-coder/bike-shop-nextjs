import Head from "next/head"
import { useContext } from "react"
import Nav from "./Nav/Nav"
import { createGlobalStyle } from "styled-components"
import Footer from "./Footer"
import Context from "./Context"

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		list-style: none;
		text-decoration: none;
		font-family: 'Poppins', sans-serif;
  }
	body {
		background-color: #fff;
	}
	main {
		margin-top: 4rem;
		width: 100%;
	}
`
export default function Layout({ children }) {
	const context = useContext(Context)
	const { isLoggedIn, isAdmin } = context.userData
	return (
		<>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Nav isLoggedIn={isLoggedIn} />
			<main>{children}</main>
			<Footer />
			<GlobalStyle />
		</>
	)
}
