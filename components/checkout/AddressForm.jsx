import { useState } from "react"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { CountryDropdown } from "react-country-region-selector"
import styled from "styled-components"

const Form = styled.div`
	width: 50%;
	display: flex;
	margin-top: 150px;
	justify-content: center;
	h2.shipping,
	h2.payment {
		font-size: 1.4rem;
		font-weight: 500;
		margin-bottom: 15px;
	}
	h3.card {
		font-size: 1.1rem;
		font-weight: 500;
		margin-bottom: 10px;
	}
	.form-flex {
		display: flex;
		flex-direction: column;
		label input,
		select {
			border-radius: 4px;
			border: none;
			box-shadow: 0 0 0 1px #e0e0e0, 0 2px 4px 0 rgba(0, 0, 0, 0.07),
				0 1px 1.5px 0 rgba(0, 0, 0, 0.05);
			width: 300px;
			height: 35px;
			margin: 5px 0;
			padding-left: 10px;
		}
		.card-element {
			width: 100%;
			padding: 8px;
			border-radius: 4px;
			box-shadow: 0 0 0 1px #e0e0e0, 0 2px 4px 0 rgba(0, 0, 0, 0.07),
				0 1px 1.5px 0 rgba(0, 0, 0, 0.05);
		}
	}
`
const StripeForm = styled.form`
	button.pay {
		cursor: pointer;
		box-shadow: 0 0 0 1px #e0e0e0, 0 2px 4px 0 rgba(0, 0, 0, 0.07),
			0 1px 1.5px 0 rgba(0, 0, 0, 0.05);
		margin: 20px 0;
		border: none;
		border-radius: 7px;
		width: 100%;
		min-height: 35px;
		background: black;
		color: whitesmoke;
		font-size: 1.2rem;
		transition: 0.2s;
		&:focus,
		&:active {
			height: max-content;
			border: 4px lightblue solid;
		}
	}
`
export default function AddressForm({ address, setAddress, total, makeOrder }) {
	const stripe = useStripe()
	const elements = useElements()
	const handleChange = e => {
		setAddress({ ...address, [e.target.name]: e.target.value })
		console.log(address)
	}
	const handleSubmit = async e => {
		e.preventDefault()
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		})
		if (error) {
			console.log(error)
		} else {
			const { id } = paymentMethod
			await makeOrder(id)
		}
		console.log(error, paymentMethod)
	}
	return (
		<Form>
			<div className="form-flex">
				<h2 className="shipping">Shipping informaion</h2>
				<label>
					<CountryDropdown
						name="country"
						className="field"
						value={address.country}
						onChange={val => setAddress({ ...address, country: val })}
					/>
				</label>
				<label>
					<input
						name="addressLine"
						placeholder="Address Line"
						type="text"
						className="field"
						value={address.addressLine}
						onChange={handleChange}
					/>
				</label>
				<label>
					<input
						name="city"
						placeholder="City"
						type="text"
						className="field"
						value={address.city}
						onChange={handleChange}
					/>
				</label>
				<label>
					<input
						name="state"
						placeholder="State/Region"
						type="text"
						className="field"
						value={address.state}
						onChange={handleChange}
					/>
				</label>
				<label>
					<input
						name="zipCode"
						placeholder="Zip code"
						type="text"
						className="field"
						value={address.zipCode}
						onChange={handleChange}
					/>
				</label>
				<h2 className="payment">Payment details </h2>

				<StripeForm onSubmit={handleSubmit}>
					<h3 className="card">Card information</h3>
					<CardElement className="card-element" />
					<button className="pay" type="submit">
						Pay ${total}.00
					</button>
				</StripeForm>
			</div>
		</Form>
	)
}
