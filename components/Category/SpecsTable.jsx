import styled from "styled-components"
const TableContainer = styled.div`
	margin: 50px auto;
	width: 100%;
	max-width: 1200px;
	padding: 0 20px;
	table {
		border-collapse: collapse;
		td,
		th {
			border: 1px solid black;
			padding: 3px;
			font-size: 0.85rem;
		}
	}
`
export default function SpecsTable({ tech_specs }) {
	return (
		<TableContainer>
			<table>
				<thead>
					<tr>
						<th>Parameter</th>
						<th>Specification</th>
					</tr>
				</thead>
				<tbody>
					{tech_specs.map((e, index) => (
						<tr key={index}>
							<td>{e[0]}</td>
							<td>{e[1]}</td>
						</tr>
					))}
				</tbody>
			</table>
		</TableContainer>
	)
}
