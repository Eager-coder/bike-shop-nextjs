import React from "react"
import styled from "styled-components"
const ItemsContainer = styled.div`
	width: 50%;
	height: 100vh;
	background: #1a1a1a;
	display: flex;
	justify-content: center;
	.items-flexbox {
		margin-top: 80px;
		color: white;
		h1 {
			font-size: 2.5rem;
		}
		.total {
			font-size: 2rem;
		}
		.item {
			max-width: 450px;
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
		}
	}
`
export default function Products({ products, total }) {
	console.log()
	return (
		<ItemsContainer>
			<div className="items-flexbox">
				<h1>Checkout</h1>
				<div className="total">Total: ${total}.00</div>
				{products.map(item => (
					<div className="item">
						<div className="image">
							<img width="50" src={item.image} alt="" />
						</div>
						<div className="item-text">
							<div key={item.id}>{item.name}</div>
							<div className="size">{item.size ? "Size: " + item.size : null}</div>
							<div className="qty-price">
								<span className="qty">Quantity: {item.quantity}</span>{" "}
								<span className="price">${item.price}.00</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</ItemsContainer>
	)
}
