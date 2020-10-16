import React from "react"
import styled from "styled-components"
const ItemsContainer = styled.div`
	width: 50%;
	min-height: 100vh;
	max-height: max-content;
	background: #1a1a1a;
	display: flex;
	justify-content: center;
	padding-top: 80px;
	.items-flexbox {
		color: white;
		h1 {
			font-size: 2.5rem;
		}
		.total {
			font-size: 2rem;
		}
	}
	@media (max-width: 1024px) {
		width: 100%;
		min-height: max-content;
		padding: 20px;
		.items-flexbox {
			margin-top: 30px;
			h1 {
				font-size: 1.7rem;
			}
			.total {
				font-size: 1.4rem;
			}
		}
	}
`
export default function Products({ products, total }) {
	return (
		<ItemsContainer>
			<div className="items-flexbox">
				<h1>Checkout</h1>
				<div className="total">Total: ${total}.00</div>
				{products.map(item => (
					<Item item={item} key={item.id} />
				))}
			</div>
		</ItemsContainer>
	)
}
const ItemBox = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin: 10px 0;
	.image {
		height: 60px;
		min-width: 25%;
		margin-right: 15px;
		img {
			border-radius: 7px;
			height: 100%;
			width: auto;
		}
	}
	.item-text {
		width: 75%;
		.size,
		.qty {
			color: #8c8c8c;
			font-size: 0.85rem;
		}
		.qty-price {
			display: flex;
			justify-content: space-between;
		}
	}
	@media (max-width: 640px) {
		.image {
			height: 50px;
		}
		.item-text {
			.name {
				font-size: 0.9rem;
			}
			.size,
			.qty {
				font-size: 0.8rem;
			}
		}
	}
`
const Item = ({ item }) => {
	return (
		<ItemBox>
			<div className="image">
				<img width="50" src={item.image} alt="" />
			</div>
			<div className="item-text">
				<div className="name">{item.name}</div>
				<div className="size">{item.size ? "Size: " + item.size : null}</div>
				<div className="qty-price">
					<span className="qty">Quantity: {item.quantity}</span>{" "}
					<span className="price">${item.price}.00</span>
				</div>
			</div>
		</ItemBox>
	)
}
