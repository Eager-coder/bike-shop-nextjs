import { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { CountryDropdown } from "react-country-region-selector"
import styled from "styled-components"
import Loading from "../Loading"
import Link from "next/link"
import Popup from "../Popup"

const MessageBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	img {
		width: 150px;
	}
	p {
		margin: 15px 0;
		font-size: 1.3rem;
	}
	a {
		background: black;
		padding: 10px;
		font-size: 1.2rem;
		border-radius: 7px;
		color: white;
	}
`

const Message = ({ message }) => {
	return (
		<MessageBox>
			{message?.isSuccess ? (
				<>
					<img src="/icons/tick.svg" alt="" />
					<p>{message.message}</p>
					<Link href="/myaccount/orders">
						<a>Order Details</a>
					</Link>
				</>
			) : (
				<>
					<p>{message.message}</p>
					<Link href="/cart">
						<a>Back to cart</a>
					</Link>
				</>
			)}
		</MessageBox>
	)
}
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
		.form-error {
			color: #d72828;
			display: flex;
			align-items: center;
			img {
				margin-right: 5px;
				width: 15px;
				height: 15px;
			}
		}
	}
	@media (max-width: 1024px) {
		width: 100%;
		margin: 30px 0;
		padding: 0 20px;
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
export default function AddressForm({ userData, products, total }) {
	const [isPopupOpen, setIsPopupOpen] = useState(false)
	const [isOrderFinished, setIsOrderFinished] = useState(false)
	const [message, setMessage] = useState(null)
	const [formError, setFormError] = useState(null)
	const stripe = useStripe()
	const elements = useElements()
	const [address, setAddress] = useState({
		country: "",
		addressLine: "",
		city: "",
		zipCode: "",
		state: "",
	})
	const handleChange = e => {
		setAddress({ ...address, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setIsPopupOpen(true)
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		})
		if (error) {
			console.log(error.message)
			setIsPopupOpen(false)
			setFormError(error.message)
		} else {
			const { id } = paymentMethod
			try {
				const res = await fetch("/api/user/checkout", {
					method: "POST",
					body: JSON.stringify({ id, products, address, userData }),
				})
				const json = await res.json()
				if (!json.isSuccess && json.isIncomplete) {
					setFormError(json.message)
					setIsPopupOpen(false)
				} else if (!json.isSuccess) {
					setMessage(json)
					setIsOrderFinished(true)
				} else if (json.isSuccess) {
					setMessage(json)
					setIsOrderFinished(true)
				}
				console.log(json)
			} catch (error) {
				setFormError(error.message)
			}
		}
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
				{formError ? (
					<div className="form-error">
						<img src="/icons/error.png" alt="" />
						{formError}{" "}
					</div>
				) : null}
			</div>

			{isPopupOpen ? (
				<Popup>{isOrderFinished ? <Message message={message} /> : <Loading size="100" />}</Popup>
			) : null}
		</Form>
	)
}
