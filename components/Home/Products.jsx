import Link from "next/link"
import ProductBig from "./ProductBig"
import ProductSmall from "./ProductSmall"
import styled from "styled-components"

// style of the Products component
const ProductsGrid = styled.section`
	width: 100%;
	max-width: 1300px;
	padding: 0 20px;
	margin: 50px auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 300px 300px;
	grid-template-areas:
		"left top"
		"left bottom";
	column-gap: 30px;
	row-gap: 30px;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	@media (max-width: 1000px) {
		grid-template-columns: 1fr;
		grid-template-areas:
			"left"
			"top"
			"bottom";
	}
	@media (max-width: 480px) {
		padding: 0 15px;
	}
`

export default function Products() {
	return (
		<ProductsGrid className="products-grid">
			<ProductBig />
			<ProductSmall area="top" className="product-top">
				<img src="/images/gloves.jpg" alt="" />
				<div className="textbox">
					<h2>The new collection of protective gloves</h2>
					<Link href="/clothing/gloves">
						<a>See gloves</a>
					</Link>
				</div>
			</ProductSmall>
			<ProductSmall area="bottom" className="product-bottom">
				<img src="/images/helmet.jpg" alt="" />
				<div className="textbox">
					<h2>Bike helmets on sale</h2>
					<Link href="/clothing/helmets">
						<a>Shop </a>
					</Link>
				</div>
			</ProductSmall>
		</ProductsGrid>
	)
}
