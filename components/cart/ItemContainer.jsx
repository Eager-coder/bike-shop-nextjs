import { useState } from "react"
import Link from "next/link"
import styled from "styled-components"
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
		<Item isLoading={isLoading}>
			<div className="item-flex">
				<div className="item-detalis">
					<div className="image">
						<img src={item.image} />
					</div>
					<div className="text">
						<Link href={`/product/${item.name}`}>
							<a className={name}>{item.name}</a>
						</Link>
						<div className="size"> {item.size ? "Size: " + item.size : null}</div>
					</div>
				</div>
				<div className="item-qty-price">
					<div className="qty-container">
						Quantity:
						<div className="qty">
							<button onClick={() => changeQty("-")}>-</button>
							<div className="qty-number">{qty}</div>
							<button onClick={() => changeQty("+")}>+</button>
						</div>
					</div>
					<div className="price">${price}.00</div>
				</div>
			</div>
			<div className="btn-remove" onClick={() => removeItem(item.id)}></div>
		</Item>
	)
}
const Item = styled.div`
	width: 100%;
	position: relative;
	border-radius: 4px;
	box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
	margin: 10px 0;
	padding: 10px 30px;
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
	.item-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		@media (max-width: 640px) {
			display: block;
		}
		.item-detalis {
			display: flex;
			width: 50%;
			.image {
				width: 50%;
				margin-right: 20px;
				img {
					width: auto;
					height: 100px;
				}
			}
			.text {
				width: 50%;
				font-size: 0.8rem;
			}
			@media (max-width: 768px) {
				.image img {
					height: 80px;
				}
			}
			@media (max-width: 640px) {
				width: 100%;
				.image {
					margin-right: 10px;
					img {
						height: 60px;
					}
				}
			}
		}
		.item-qty-price {
			width: 50%;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			@media (max-width: 640px) {
				width: 100%;
				justify-content: space-between;
			}
			.qty-container {
				width: 25%;
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
			.price {
				width: 25%;
				display: flex;
				justify-content: center;
			}
		}
	}

	.btn-remove {
		cursor: pointer;
		position: absolute;
		top: 5px;
		right: 12px;
		::after {
			content: "\\00D7";
			font-size: 2rem;
		}
	}
`
