import { useState, useEffect } from "react"
import styled from "styled-components"
import { client } from "../../../client"
import Message from "../../Auth/Message"
import { BtnSecondary, BtnPrimary, BtnDanger } from "../../Buttons"
import Modal from "../../Modal"
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
	.buttons {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		button {
			margin-bottom: 20px;
		}
	}
`

export default function Item({ product, getProducts }) {
	const [isUpdateOpen, setIsUpdateOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)
	const [isShown, setIsShown] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState({ isSuccess: false, text: null })
	const table = product.tech_specs
		.replace(/[\r\n\t]/g, "")
		.split("#")
		.filter(e => e.length)
		.map(e => {
			return e.split("=")
		})
	const deleteProduct = async () => {
		setIsLoading(true)
		const { ok, message } = await client(`/api/admin/delete?productId=${product.id}`, "DELETE")
		setMessage({ isSuccess: ok, text: message })
		setIsLoading(false)
		if (ok) {
			setIsDeleteOpen(false)
			await getProducts()
		}
	}
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
					<BtnSecondary
						fontSize="1rem"
						padding="2px 5px"
						margin="10px 0"
						label={isShown ? "Hide" : "Show all"}
						onClick={() => setIsShown(!isShown)}
					/>
				</div>
				<div className="buttons">
					<BtnPrimary label="Update" fontSize="1rem" onClick={() => setIsUpdateOpen(true)} />
					<BtnDanger label="Delete" fontSize="1rem" onClick={() => setIsDeleteOpen(true)} />
				</div>

				{isUpdateOpen ? (
					<UpdateProduct
						isUpdateOpen={isUpdateOpen}
						setIsUpdateOpen={setIsUpdateOpen}
						product={product}
					/>
				) : (
					""
				)}
				{isDeleteOpen ? (
					<Modal isForm={true}>
						<h2>Do you really want to delete this item?</h2>
						<p>Name: {product.name}</p>
						<div style={{ display: "flex", justifyContent: "center" }}>
							<img width="200" height="auto" src={product.image} alt="" />
						</div>
						{message.text ? <Message status={message.isSuccess} message={message.text} /> : null}

						<div className="buttons">
							<BtnSecondary
								label="Cancel"
								disabled={isLoading}
								onClick={() => setIsDeleteOpen(false)}
							/>
							<BtnPrimary label="Delete" disabled={isLoading} onClick={() => deleteProduct()} />
						</div>
					</Modal>
				) : (
					""
				)}
			</div>
			<hr />
		</ItemContainer>
	)
}
