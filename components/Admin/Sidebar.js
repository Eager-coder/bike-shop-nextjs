import styled from "styled-components"
const Aside = styled.aside`
	position: fixed;
	left: 0;
	top: 4rem;
	bottom: 0;
	width: 250px;
	height: 100vh;
	background: black;
	ul {
		list-style: none;
		li {
			cursor: pointer;
			padding: 15px;
			border-bottom: 2px white solid;
			color: white;
			display: flex;
			align-items: center;
			img {
				filter: invert(1);
				width: 25px;
				margin-right: 10px;
			}
		}
	}
`
export default function Sidebar({ setScreen }) {
	return (
		<Aside>
			<ul>
				<li onClick={() => setScreen("orders")}>
					<img src="https://img.icons8.com/material-rounded/100/000000/user.png" />
					Orders
				</li>
				<li onClick={() => setScreen("products")}>
					<img src="https://img.icons8.com/material/64/000000/product--v1.png" />
					View Products
				</li>
				<li onClick={() => setScreen("createProduct")}>
					<img src="https://img.icons8.com/ios-glyphs/50/000000/add-property.png" />
					Add Products
				</li>
			</ul>
		</Aside>
	)
}
