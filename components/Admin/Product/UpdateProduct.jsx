import { useState, useEffect } from "react"
import styled from "styled-components"
const Div = styled.div`
	display: flex;
	padding-left: 100px;
	padding-top: 50px;
	width: 100%;
	position: fixed;
	top: 4rem;
	bottom: 0;
	left: 250px;
	right: 0;
	z-index: 3;
	background-color: rgba(255, 255, 255, 0.95);

	overflow-y: auto;
	h2 {
		font-size: 2rem;
	}
	form {
		overflow-y: auto;
		.flexbox {
			display: flex;
			width: 800px;
			justify-content: space-between;
			label {
				display: flex;
				flex-direction: column;
				margin: 10px 0;
				div {
					width: 150px;
					font-size: 1rem;
				}
				input {
					width: 300px;
					height: 30px;
					font-size: 1rem;
					border: 1px black solid;
					border-radius: 2px;
					padding-left: 5px;
				}
				select {
					width: 100px;
					height: 30px;
				}
				textarea[name="description"] {
					width: 400px;
					height: 100px;
					font-size: 0.85rem;
					padding: 5px;
				}
				textarea[name="tech_specs"] {
					width: 400px;
					height: 300px;
					font-size: 0.85rem;
					padding: 5px;
				}
			}
		}
		input[type="submit"] {
			cursor: pointer;
			background: black;
			width: max-content;
			height: max-content;
			margin: 20px;
			border: none;
			border-radius: 7px;
			color: white;
			align-self: center;
			padding: 10px 15px;
		}
		#close {
			cursor: pointer;
			background: white;
			width: max-content;
			height: max-content;
			border: 2px solid black;
			padding: 5px 10px;
			margin: 20px;
			border-radius: 7px;
			color: black;
			align-self: center;
		}
	}
`
const Popup = styled.div`
	width: 150px;
	height: 50px;
	button {
		cursor: pointer;
		background: white;
		width: max-content;
		height: max-content;
		border: 2px solid black;
		padding: 5px 10px;
		margin: 20px;
		border-radius: 7px;
		color: black;
		align-self: center;
	}
`
export default function Update({ isUpdateOpen, setIsUpdateOpen, product }) {
	const [list, setList] = useState({ ...product })
	const [isUpdated, setIsUpdated] = useState(false)
	const fetchData = async e => {
		e.preventDefault()
		const res = await fetch("/api/admin/update", {
			method: "POST",
			body: JSON.stringify(list),
		})
		const json = await res.json()
		setIsUpdated(json.isSuccess)
	}
	const handleChange = e => {
		setList({ ...list, [e.target.name]: e.target.value })
	}

	return (
		<Div>
			{isUpdated ? (
				<Popup>
					Item Updated!
					<button id="close" onClick={() => setIsUpdateOpen(false)}>
						Close
					</button>
				</Popup>
			) : (
				<form onSubmit={fetchData}>
					<h2>Update a product</h2>
					<div className="flexbox">
						<div className="left">
							<label>
								<div>Product name</div>
								<input
									onChange={handleChange}
									type="text"
									name="name"
									defaultValue={product.name}
								/>
							</label>
							<label>
								<div>Brand</div>
								<input
									onInput={handleChange}
									type="text"
									name="brand"
									defaultValue={product.brand}
								/>
							</label>
							<label>
								<div>Category</div>
								<select onChange={handleChange} name="category" defaultValue={product.category}>
									<option></option>
									<option value="bikes">Bikes</option>
									<option value="accessories">Accessories</option>
									<option value="clothing">Clothing</option>
								</select>
							</label>
							<label>
								<div>Type</div>
								<input
									onChange={handleChange}
									type="text"
									name="type"
									defaultValue={product.type}
								/>
							</label>
							<label>
								<div>Price</div>
								<input
									onChange={handleChange}
									type="number"
									name="price"
									defaultValue={product.price}
								/>
							</label>
							<label>
								<div>Year</div>
								<input
									onChange={handleChange}
									type="number"
									name="year"
									defaultValue={product.year}
								/>
							</label>
							<label>
								<div>Image URL</div>
								<input
									onChange={handleChange}
									type="text"
									name="image"
									defaultValue={product.image}
								/>
							</label>
						</div>
						<div className="right">
							<label>
								<div>Description</div>
								<textarea
									onChange={handleChange}
									name="description"
									defaultValue={product.description}></textarea>
							</label>
							<label>
								<div>Technical specs</div>
								<textarea
									name="tech_specs"
									onChange={handleChange}
									placeholder="#parameter = specification"
									defaultValue={product.tech_specs}></textarea>
							</label>
						</div>
					</div>

					<input type="submit" value="Update" />

					<button id="close" onClick={() => setIsUpdateOpen(false)}>
						Close
					</button>
				</form>
			)}
		</Div>
	)
}
