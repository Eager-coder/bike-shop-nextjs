import styled from "styled-components"
import Link from "next/link"

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	img {
		width: 100%;
		height: 200px;
		object-fit: contain;
	}
	header {
		font-weight: bold;
		font-size: 1rem;
		text-transform: uppercase;
		text-align: center;
	}
	div {
		text-align: center;
	}
	@media (max-width: 1000px) {
		header {
			font-size: 0.8rem;
		}
	}
`
export default function Item({ data }) {
	return (
		<Container>
			<Link href="/product/[uid]" as={`/product/${data.name}`} passHref>
				<a>
					<img src={data.image} alt="" />
				</a>
			</Link>
			<div className="textbox">
				<header>{data.name}</header>
				<div className="price">${data.price}</div>
			</div>
		</Container>
	)
}
