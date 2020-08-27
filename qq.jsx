import React from "react"

const CheckoutForm = ({ success }) => {
	const stripe = useStripe()
	const elements = useElements()

	const handleSubmit = async event => {
		event.preventDefault()

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		})

		if (!error) {
			const { id } = paymentMethod

			try {
				// const { data } = await axios.post('/api/payment', { id, amount: 1099 })
				const res = await fetch("/api/payment", {
					method: "POST",
					body: JSON.stringify({ id, amount: 10000 }),
					// body: { id, amount: 10 },
				})
			} catch (error) {
				console.log(error)
			}
		}
	}

	return (
		<form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
			<h2>Price: $10.99 USD</h2>
			<img
				src="https://images.ricardocuisine.com/services/recipes/500x675_7700.jpg"
				style={{ maxWidth: "50px" }}
			/>
			<CardElement />
			<button type="submit" disabled={!stripe}>
				Pay
			</button>
		</form>
	)
}

// you should use env variables here to not commit this
// but it is a public key anyway, so not as sensitive
const stripePromise = loadStripe(
	"pk_test_51HGfGQIig73WQN7K9q09PsnsZ6EkJ3srfB50IoVXuUK5E0lD2U9Uxgb5mHSrsKq8PGAWfR58IVfBFonSw7dAZdWu00jkFR4r2O"
)

const Index = () => {
	const [status, setStatus] = useState("ready")

	if (status === "success") {
		return <div>Congrats on your empanadas!</div>
	}

	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm
				success={() => {
					setStatus("success")
				}}
			/>
		</Elements>
	)
}

export default Index
