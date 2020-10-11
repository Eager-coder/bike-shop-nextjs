import styled from "styled-components"
import Item from "./Item"
import Loading from "../../Loading"

const ProductsSection = styled.section`
	h1 {
		font-size: 2.5rem;
		margin-bottom: 30px;
	}
	width: 100%;
`
export default function AllProducts({ products }) {
	return (
		<ProductsSection>
			<h1>All Products</h1>
			{products ? (
				products.map((e, index) => <Item key={index} product={e} />)
			) : (
				<Loading size="100" />
			)}
		</ProductsSection>
	)
}
