import { useState, useEffect } from "react"
import styled from "styled-components"
const Form = styled.form`
	width: 100%;
	h1 {
		font-size: 2.5rem;
		margin-bottom: 30px;
	}
	.flexbox {
		display: flex;
		width: 800px;
		justify-content: space-between;
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
	input[type="submit"] {
		cursor: pointer;
		background: black;
		width: 120px;
		height: 50px;
		margin-top: 20px;
		border-radius: 7px;
		color: white;
		align-self: center;
	}
`
const Popup = styled.div`
	width: 100%;
	height: 50px;
	background-color: ${({ status }) => (status === 201 ? "green" : "red")};
	color: "white";
`
export default function AddProduct() {
	const [list, setList] = useState({})
	const [msg, setMsg] = useState(null)
	const fetchData = async e => {
		e.preventDefault()
		const res = await fetch("/api/admin/insert", {
			method: "POST",
			body: JSON.stringify(list),
		})
		const message = await res.json()
		setMsg(message)
	}
	const handleChange = e => {
		setList({ ...list, [e.target.name]: e.target.value.replace(/'/g, "''") })
	}

	return (
		<Form onSubmit={fetchData}>
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
					{msg ? (
						<Popup status={msg.status}>
							<span>
								{msg.status === 201 ? "Success! " + msg.message : "Error! " + msg.message}
							</span>
						</Popup>
					) : (
						""
					)}
				</div>
			</div>

			<input type="submit" value="Post item" />
		</Form>
	)
}
