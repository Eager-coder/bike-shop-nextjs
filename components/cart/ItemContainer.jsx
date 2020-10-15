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
	*:focus,
	*:active {
		outline: none;
		border: none;
	}
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
		width: calc(100% / 6);
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
	.qty-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		.qty {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 5px;
			.qty-number {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 25px;
				height: 25px;
				margin: 0 15px;
				border: 1px solid rgba(0, 0, 0, 0.2);
			}
			button {
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
				border: none;
				background: none;
				font-weight: 500;
				color: rgba(89, 88, 89, 1);
				font-size: 1.8rem;
				width: 25px;
				height: 25px;
			}
		}
	}
	.btn-remove {
		cursor: pointer;
		width: 25px;
		height: 25px;
		background: none;
		border: none;
		img {
			width: auto;
			height: 100%;
		}
	}
`
export default function ItemContainer({ item, products, setProducts }) {
	const [isLoading, setIsLoading] = useState(false)
	const [qty, setQty] = useState(item.quantity)
	const [price, setPrice] = useState(item.quantity * item.price)
	const changeQty = async type => {
		const newQty = type === "-" ? qty - 1 : qty + 1
		if (newQty <= 0 || newQty > 20) return
		setIsLoading(true)
		const res = await fetch("/api/user/cart", {
			method: "PUT",
			body: JSON.stringify({ itemId: item.id, qty: newQty }),
		})
		const json = await res.json()
		if (json.isSuccess) {
			setQty(json.qty)
			setPrice(json.qty * item.price)
			const newProd = products.map(product => {
				if (product.id === item.id) {
					product.quantity = newQty
					return product
				} else {
					return product
				}
			})
			setProducts(newProd)
			setIsLoading(false)
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
			<div className="name">{item.name}</div>
			<div className="size"> {item.size ? "Size: " + item.size : null}</div>
			<div className="qty-container">
				Quantity:
				<div className="qty">
					<button onClick={() => changeQty("-")}>-</button>
					<div className="qty-number">{qty}</div>
					<button onClick={() => changeQty("+")}>+</button>
				</div>
			</div>
			<div className="price">${price}.00</div>
			<button className="btn-remove" onClick={() => removeItem(item.id)}>
				<img src="https://img.icons8.com/android/96/000000/trash.png" />
			</button>
		</Div>
	)
}
