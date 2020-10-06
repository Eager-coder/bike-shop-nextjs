import { Step, StepLabel, Stepper } from "@material-ui/core"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import styled from "styled-components"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "../components/Layout"
import { CountryDropdown } from "react-country-region-selector"

const Div = styled.div`
	width: 100%;
	max-width: 800px;
	padding: 0 15px;
	margin: 0 auto;
	h1 {
		text-align: center;
	}
	.form {
		width: max-content;
		margin: 0 auto;
	}
	.step {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.field {
		display: block;
		margin: 10px 0;
		width: 300px;
		height: 35px;
		border: 1px solid rgba(0, 0, 0, 0.4);
		border-radius: 3px;
		padding-left: 5px;
		font-size: 1.1rem;
	}
`
export default function Checkout({ data }) {
	// const router = useRouter()
	console.log(data)
	const stripePromise = loadStripe(
		"pk_test_51HGfGQIig73WQN7K9q09PsnsZ6EkJ3srfB50IoVXuUK5E0lD2U9Uxgb5mHSrsKq8PGAWfR58IVfBFonSw7dAZdWu00jkFR4r2O"
	)

	return (
		<Elements stripe={stripePromise}>
			<Forms />
		</Elements>
	)
}

export function Forms() {
	const [step1, setStep1] = useState({
		firstName: "",
		lastName: "",
		email: "",
		telNumber: "",
	})
	const [step2, setStep2] = useState({
		country: "",
		state: "",
		city: "",
		zipCode: "",
	})
	const handleStep = (step, e) => {
		step == 1
			? setStep1({ ...step1, [e.target.name]: e.target.value })
			: setStep2({ ...step2, [e.target.name]: e.target.value })
	}
	const handleNext = step => {
		const obj = step === 0 ? step1 : step2
		let isEmpty = false
		for (let field in obj) {
			if (!obj[field].trim()) {
				return (isEmpty = true)
			}
		}
		if (isEmpty) return isEmpty
	}
	const [products, setProducts] = useState([])
	const [total, setTotal] = useState(0)
	useEffect(() => {
		const cartItems = JSON.parse(localStorage.getItem("cartItems"))
		setProducts(cartItems)
		setTotal(cartItems.reduce((a, b) => a + b.price, 0))
		console.log(products)
	}, [])
	const stripe = useStripe()
	const elements = useElements()
	const handleSubmit = async event => {
		event.preventDefault()
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		})
		console.log(error, paymentMethod)
		if (!error) {
			const { id } = paymentMethod
			try {
				const res = await fetch("/api/payment", {
					method: "POST",
					body: JSON.stringify({ id, amount: total * 100, products, ...step1, ...step2 }),
				})
				console.log(await res.json())
			} catch (error) {
				console.log(error)
			}
		}
	}
	return (
		<Layout>
			<Div>
				<h1>Checkout</h1>
				<FormStepper props={{ step1, step2, setStep1, setStep2, handleNext }}>
					<div className="step" label="Personal information">
						<label>
							<span>First Name</span>
							<input
								name="firstName"
								type="text"
								className="field"
								value={step1.firstName}
								onChange={e => handleStep(1, e)}
							/>
						</label>
						<label>
							<span>Last Name</span>
							<input
								name="lastName"
								type="text"
								className="field"
								value={step1.lastName}
								onChange={e => handleStep(1, e)}
							/>
						</label>
						<label>
							<span>Email</span>
							<input
								name="email"
								type="email"
								className="field"
								value={step1.email}
								onChange={e => handleStep(1, e)}
							/>
						</label>
						<label>
							<span>Tel. Number</span>
							<input
								name="telNumber"
								type="tel"
								className="field"
								value={step1.telNumber}
								onChange={e => handleStep(1, e)}
							/>
						</label>
					</div>
					<div className="step" label="Shipping address">
						<label>
							<span>Country</span>
							<CountryDropdown
								name="country"
								className="field"
								value={step2.country}
								onChange={val => setStep2({ ...step2, country: val })}
							/>
						</label>
						<label>
							<span>State</span>
							<input
								name="state"
								type="text"
								className="field"
								value={step2.state}
								onChange={e => handleStep(2, e)}
							/>
						</label>
						<label>
							<span>City</span>
							<input
								name="city"
								type="text"
								className="field"
								value={step2.city}
								onChange={e => handleStep(2, e)}
							/>
						</label>
						<label>
							<span>Zip code</span>
							<input
								name="zipCode"
								type="tel"
								className="field"
								value={step2.zipCode}
								onChange={e => handleStep(2, e)}
							/>
						</label>
					</div>
					<div className="step" label="Review and Payment">
						<section>
							{products.map(e => (
								<div key={e.name}>
									<div>{e.name}</div>
									<div>Price: ${e.price}</div>
									<div>Quantity: {e.qty}</div>
								</div>
							))}
							<p>Total: ${total}</p>
						</section>
						<form onSubmit={handleSubmit} style={{ width: "350px" }}>
							<CardElement />
							<button type="submit">Pay</button>
						</form>
					</div>
				</FormStepper>
			</Div>
		</Layout>
	)
}

export function FormStepper({ children, props }) {
	const childrenArray = React.Children.toArray(children)
	const [step, setStep] = useState(0)
	const currentChild = childrenArray[step]
	const { handleNext } = props
	const [errorMessage, setErrorMessage] = useState(null)
	const handleClick = () => {
		if (!handleNext(step)) {
			setErrorMessage(null)
			setStep(prev => prev + 1)
		} else {
			setErrorMessage("Please fill all the fields")
		}
	}

	return (
		<section>
			<div className="form">
				<Stepper alternativeLabel activeStep={step}>
					{childrenArray.map((child, index) => (
						<Step key={child.props.label} completed={step > index}>
							<StepLabel>{child.props.label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<span>{errorMessage}</span>
				{currentChild}
				{step > 0 ? <button onClick={() => setStep(prev => prev - 1)}>Go Back</button> : null}
				{step >= 0 && step < 2 ? <button onClick={handleClick}>Next </button> : null}
			</div>
		</section>
	)
}
// export async function getServerSideProps(ctx) {
// 	const { headers } = ctx.req.headers
// 	const res = await fetch(`http://${ctx.req.headers.host}/api/user/isTokenValid`, {
// 		headers,
// 	})
// 	const json = await res.json()

// 	if (!json.isLoggedIn) {
// 		ctx.res.setHeader("location", "/login")
// 		ctx.res.statusCode = 302
// 		// ctx.res.end()
// 		return {
// 			props: {
// 				data: json,
// 			},
// 		}
// 	} else {
// 		return {
// 			props: {
// 				data: json,
// 			},
// 		}
// 	}
// }
