import styled from "styled-components"
import Item from "./Item"
const Section = styled.section`
	width: calc(100% - 200px);
	padding-left: 50px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 20px;
	row-gap: 20px;
	@media (max-width: 900px) {
		width: 100%;
		padding: 0;
		grid-template-columns: 1fr 1fr;
	}
	@media (max-width: 480px) {
		grid-template-columns: 1fr;
	}
`
export default function ItemGrid({ productList }) {
	return (
		<Section>
			{productList.map((e, index) => (
				<Item key={index} data={e} />
			))}
		</Section>
	)
}
