import styled from "styled-components"
const ItemBox = styled.div`
	display: flex;
	align-items: center;
	margin: 50px 0;
	.image {
		height: 70px;
		width: 150px;
		margin-right: 15px;
		img {
			border-radius: 7px;
			height: auto;
			width: 100%;
		}
	}
	.item-details {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.size,
		.qty {
			color: grey;
			font-size: 0.85rem;
		}
		.price {
			font-size: 1.3rem;
			font-weight: 500px;
		}
	}
	@media (max-width: 768px) {
		.image {
			height: auto;
			width: 100px;
			margin-right: 10px;
		}
		.item-details {
			.name {
				font-size: 0.8rem;
			}
			.size,
			.qty {
				font-size: 0.8rem;
			}
			.price {
				font-size: 1rem;
				font-weight: 500px;
			}
		}
	}
	@media (max-width: 480px) {
		.image {
			width: 80px;
		}
	}
`
export default function OrderItem({ item }) {
	// products.products.forEach(product => {
	// 	if (Number(product.id) === Number(item.product_id)) {
	// 		item.image = product.image
	// 		item.name = product.name
	// 	}
	// })
	return (
		<ItemBox>
			<div className="image">
				<img width="50" src={item.image} alt="" />
			</div>
			<div className="item-details">
				<div className="left">
					<div className="name">{item.name}</div>
					<div className="size">{item.size ? "Size: " + item.size : null}</div>
					<span className="qty">Quantity: {item.quantity}</span>
				</div>
				<div className="right">
					<span className="price">${item.price}.00</span>
				</div>
			</div>
		</ItemBox>
	)
}
