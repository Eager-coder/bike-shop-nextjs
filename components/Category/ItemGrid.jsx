import styled from "styled-components"
import Item from "./Item"
const Section = styled.section`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 20px;
	row-gap: 20px;
	padding: ${({ padding }) => padding};
	@media (max-width: 1280px) {
		width: 100%;
		grid-template-columns: 1fr 1fr;
	}
	@media (max-width: 640px) {
		grid-template-columns: 1fr;
	}
`
export default function ItemGrid({ productList, padding }) {
	console.log(padding)
	return (
		<Section padding={padding}>
			{productList.map((e, index) => (
				<Item key={index} data={e} />
			))}
		</Section>
	)
}
