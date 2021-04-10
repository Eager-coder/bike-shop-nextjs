import { useState, useEffect } from "react"
import styled from "styled-components"
import Message from "../../Auth/Message"
import { client } from "../../../client"
const Form = styled.form`
	width: 100%;
	h1 {
		font-size: 2.5rem;
		margin-bottom: 30px;
	}
	.flexbox {
		display: flex;
		width: 900px;
		justify-content: space-between;
		@media (max-width: 900px) {
			display: block;
		}
	}
	label {
		display: flex;
		flex-direction: column;
		margin: 10px 0;
		div {
			width: 150px;
			font-size: 1rem;
		}
		input {
			width: 350px;
			height: 30px;
			font-size: 1rem;
			border: 1px black solid;
			border-radius: 3px;
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
	button {
		width: 120px;
		height: 50px;
		border-radius: 4px;
		border: white 2px solid;
		color: white;
		font-size: 1.1rem;
		font-weight: 500;
		background-color: black;
		cursor: pointer;
		&:disabled {
			background-color: grey;
			opacity: 0.6;
		}
	}
`
const Popup = styled.div`
	width: 100%;
	height: 50px;
	background-color: ${({ status }) => (status === 201 ? "green" : "red")};
	color: "white";
`
export default function AddProduct({ getProducts }) {
	const [list, setList] = useState({})
	const [msg, setMsg] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const submitData = async e => {
		e.preventDefault()
		setIsLoading(true)
		const { ok, message } = await client("/api/admin/insert", "POST", list)
		setMsg({ message, isSuccess: ok })
		setIsLoading(false)
		if (ok) getProducts()
	}
	const handleChange = e => {
		setList({ ...list, [e.target.name]: e.target.value.replace(/'/g, "''") })
	}

	return (
		<Form onSubmit={submitData}>
			<h1>Add a new Product</h1>
			<div className="flexbox">
				<div className="left">
					<label>
						<div>Product name</div>
						<input onInput={handleChange} type="text" name="name" />
					</label>
					<label>
						<div>Brand</div>
						<input onInput={handleChange} type="text" name="brand" />
					</label>
					<label>
						<div>Category</div>
						<select onInput={handleChange} name="category">
							<option></option>
							<option value="bikes">Bikes</option>
							<option value="accessories">Accessories</option>
							<option value="clothing">Clothing</option>
						</select>
					</label>
					<label>
						<div>Type</div>
						<input onInput={handleChange} type="text" name="type" />
					</label>
					<label>
						<div>Price</div>
						<input onInput={handleChange} type="number" name="price" />
					</label>
					<label>
						<div>Year</div>
						<input onInput={handleChange} type="number" name="year" />
					</label>
					<label>
						<div>Image URL</div>
						<input onInput={handleChange} type="text" name="image" />
					</label>
				</div>
				<div className="right">
					<label>
						<div>Description</div>
						<textarea onInput={handleChange} name="description"></textarea>
					</label>
					<label>
						<div>Technical specs</div>
						<textarea
							name="tech_specs"
							onInput={handleChange}
							placeholder="#parameter = specification"></textarea>
					</label>
					{msg ? <Message message={msg.message} status={msg.isSuccess} /> : ""}
				</div>
			</div>

			<button type="submit" disabled={isLoading}>
				Post item
			</button>
		</Form>
	)
}
