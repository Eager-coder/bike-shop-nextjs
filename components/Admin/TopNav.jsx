import Link from "next/link"
import styled from "styled-components"
const Header = styled.header`
	width: 100%;
	height: 4rem;
	background: black;
	position: fixed;
	nav {
		height: 100%;
		width: 100%;
		padding: 0 50px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.logo {
			img {
				width: 80px;
				filter: invert(1);
			}
		}
		.user-links {
			button.logout {
				background: white;
				width: 60px;
				height: 30px;
				border-radius: 7px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
`
export default function TopNav() {
	return (
		<Header>
			<nav>
				<Link href="/" passHref>
					<a className="logo">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/FOCUS_Bikes_Logo_schwarz.svg/1280px-FOCUS_Bikes_Logo_schwarz.svg.png"
							alt=""
						/>
					</a>
				</Link>
				<div className="user-links">{/* <button className="logout">Log out</button> */}</div>
			</nav>
		</Header>
	)
}
