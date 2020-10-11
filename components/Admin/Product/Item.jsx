import { useState, useEffect } from "react"
import styled from "styled-components"
import UpdateProduct from "./UpdateProduct"
const ItemContainer = styled.div`
	width: 100%;
	.item-flex {
		display: flex;
		margin: 20px 0;
	}
	* {
		font-size: 0.9rem;
	}
	.image {
		width: 250px;
		height: 200px;
		margin-right: 20px;
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
	.textbox {
		width: 800px;
		span {
			display: block;
			margin: 5px 0;
		}
	}
	table {
		margin-top: 10px;
		border-collapse: collapse;
		td,
		th {
			border: 1px solid black;
			padding: 3px;
		}
	}
	#update-btn {
		cursor: pointer;
		background: black;
		width: max-content;
		height: max-content;
		border: none;
		border-radius: 7px;
		color: white;
		padding: 10px;
	}
	#show-all {
		cursor: pointer;
		background: white;
		width: max-content;
		height: max-content;
		border: 2px black solid;
		border-radius: 5px;
		padding: 2px 5px;
		margin-top: 5px;
	}
`

export default function Item({ product }) {
	const [isUpdateOpen, setIsUpdateOpen] = useState(false)
	const [isShown, setIsShown] = useState(false)
	const table = product.tech_specs
		.replace(/[\r\n\t]/g, "")
		.split("#")
		.filter(e => e.length)
		.map(e => {
			return e.split("=")
		})
	return (
		<ItemContainer>
			<div className="item-flex">
				<div className="image">
					<img src={product.image} alt="" />
				</div>
				<div className="textbox">
					<span>
						<b>Name: </b> {product.name}
					</span>
					<span>
						<b>Price: </b> ${product.price}
					</span>
					{isShown ? (
						<>
							<span>
								<b>Year: </b>
								{product.year}
							</span>
							<span>
								<b>Brand: </b>
								{product.brand}
							</span>
							<span>
								<b>Category: </b>
								{product.category}
							</span>
							<span>
								<b>Type: </b>
								{product.type}
							</span>
							<p>
								<b>Description: </b> {product.description}
							</p>
							<table>
								<thead>
									<tr>
										<th>Parameter</th>
										<th>Specification</th>
									</tr>
								</thead>
								<tbody>
									{table.map((e, index) => (
										<tr key={index}>
											<td>{e[0]}</td>
											<td>{e[1]}</td>
										</tr>
									))}
								</tbody>
							</table>
						</>
					) : (
						""
					)}

					<button id="show-all" onClick={() => setIsShown(!isShown)}>
						{isShown ? "Hide" : "Show all"}
					</button>
				</div>

				<button id="update-btn" onClick={() => setIsUpdateOpen(true)}>
					Update
				</button>
				{isUpdateOpen ? (
					<UpdateProduct
						isUpdateOpen={isUpdateOpen}
						setIsUpdateOpen={setIsUpdateOpen}
						product={product}
					/>
				) : (
					""
				)}
			</div>
			<hr />
		</ItemContainer>
	)
}
