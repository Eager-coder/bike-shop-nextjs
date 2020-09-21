import { useState, useEffect } from "react"
import Link from "next/link"
import DropdownMenu from "./dropdownMenu"
import UserLinks from "./UserLinks"
import styled from "styled-components"
const Header = styled.header`
	height: 4rem;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background-color: ${props => (props.isLoggedIn ? "#1a1a1a" : "orange")};
	z-index: 2;
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 20px;
	}
`
const MenuBtn = styled.div`
	display: none;
	img {
		width: 30px;
		filter: invert(1);
	}
	@media screen and (max-width: 768px) {
		display: block;
	}
`
const LinksLeft = styled.div`
	display: flex;
	align-items: center;
	> a > img {
		width: 80px;
		filter: invert(0.9);
	}
	.nav-links {
		display: flex;
		transition: 0.4s;
		@media (max-width: 768px) {
			z-index: 2;
			flex-direction: column;
			background-color: black;
			width: 100%;
			height: 100vh;
			overflow-y: scroll;
			position: fixed;
			transform: translateX(${props => (props.isMenuOpen ? "0%" : "-150%")});
			transition: 0.4s;
			top: 4rem;
			left: 0;
			right: 0;
		}
	}
`

export default function Nav({ isLoggedIn }) {
	const [isMenuOpen, setMenuOpen] = useState(false)
	const [isSearchOpen, setSearchOpen] = useState(false)
	return (
		<Header isLoggedIn={isLoggedIn}>
			<nav>
				<LinksLeft isMenuOpen={isMenuOpen}>
					<MenuBtn onClick={() => setMenuOpen(!isMenuOpen)}>
						<img src="/icons/burger.svg" alt="" />
					</MenuBtn>
					<Link href="/" passHref>
						<a>
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/FOCUS_Bikes_Logo_schwarz.svg/1280px-FOCUS_Bikes_Logo_schwarz.svg.png"
								alt=""
							/>
						</a>
					</Link>
					<ul className="nav-links">
						<DropdownMenu category="bikes" links={["mountain", "bmx", "road", "city"]} />
						<DropdownMenu
							category="accessories"
							links={["lighting", "pumps", "locks", "bottles"]}
						/>
						<DropdownMenu category="clothing" links={["helmets", "gloves", "jerseys"]} />
					</ul>
				</LinksLeft>
				<UserLinks
					isSearchOpen={isSearchOpen}
					setSearchOpen={setSearchOpen}
					isLoggedIn={isLoggedIn}
				/>
			</nav>
		</Header>
	)
}
