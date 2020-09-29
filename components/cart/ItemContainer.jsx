import { useState } from "react"
import styled from "styled-components"

const Div = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-radius: 4px;
	box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
	font-size: 0.9rem;
	margin: 10px 0;
	padding: 15px;
	&::after {
		${({ isLoading }) =>
			isLoading
				? `content: "";
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: rgba(240, 240, 240, 0.7);`
				: null}
	}
	& > * {
		width: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.image {
		img {
			width: auto;
			height: 100px;
		}
	}
	.qty-label {
		display: flex;
		flex-direction: column;
	}
	.quantity {
		width: 50px;
		font-size: 1.1rem;
		height: 30px;
		padding-left: 7px;
	}
	.btn-remove {
		width: 25px;
		height: 25px;
	}
`
export default function ItemContainer({ item, isLoggedIn, products, setProducts }) {
	const [isLoading, setIsLoading] = useState(false)
	const changeQty = async (e, id) => {
		if (isLoggedIn) {
			setIsLoading(true)
			const res = await fetch("/api/user/cart", {
				method: "PUT",
				body: JSON.stringify({ itemId: id, qty: e.target.value }),
			})
			const json = await res.json()
			if (json.isSuccess) {
				setIsLoading(false)
			}
		} else {
			const updataedItems = products.map(elem => {
				if (elem.id === id) {
					elem.quantity = Number(e.target.value)
					return elem
				}
				return elem
			})
			setProducts(updataedItems)
			localStorage.setItem("cartItems", JSON.stringify(updataedItems))
		}
	}
	const removeItem = async id => {
		setIsLoading(true)
		const res = await fetch(`/api/user/cart?itemId=${id}`, { method: "DELETE" })
		const json = await res.json()
		if (json.isSuccess) {
			setIsLoading(false)
			const updatedItems = products.filter(elem => elem.id !== id)
			setProducts(updatedItems)
		}
	}
	return (
		<Div isLoading={isLoading}>
			<div className="image">
				<img src={item.image} />
			</div>
			<div className="name">
				{item.name}
				<div className="size"> {item.size ? "Size: " + item.size : ""}</div>
			</div>
			<label className="qty-label">
				Quantity:
				<input
					className="quantity"
					type="number"
					defaultValue={item.quantity}
					min="1"
					max="20"
					onChange={event => changeQty(event, item.id)}
				/>
				<br />
			</label>
			<div className="price">Price: ${item.price * item.quantity}</div>
			<button className="btn-remove" onClick={() => removeItem(item.id)}>
				X
			</button>
		</Div>
	)
}
