import { useContext } from "react"
import styled from "styled-components"
import { UserContext } from "../Context"
import moment from "moment"
const OrderBox = styled.div`
	width: 100%;
	border-radius: 4px;
	box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
	margin: 10px 0;
	padding: 30px 40px;
	.id-total {
		display: flex;
		justify-content: space-between;
		.order-id,
		.total {
			font-size: 1.6rem;
			font-weight: 500;
		}
	}
	.details {
		margin: 10px 0;
		display: flex;
		justify-content: space-between;
		span {
			font-weight: 500;
		}
	}
`
export default function Order({ order }) {
	const {
		address_line,
		city,
		country,
		state,
		zip_code,
		order_id,
		items,
		total,
		created_at,
		status,
	} = order
	console.log("itemsArray:", items)
	return (
		<OrderBox>
			<div className="id-total">
				<span className="order-id">Order ID: {order_id}</span>
				<span className="total">Total: ${total}.00</span>
			</div>

			<div className="details">
				<div className="left">
					<div className="addres">
						<span>Address:</span> {address_line}, {city}, <br /> {state}, {country}, {zip_code}
					</div>
					<div className="time-created">
						<span>Time ordered:</span> {moment(created_at).format("LLL")}
					</div>
				</div>
				<div className="right">
					<div className="status">
						<span>Status: </span>
						{status}
					</div>
					<button className="btn-completed">Confirm completion</button>
				</div>
			</div>

			{items.map(item => (
				<Item item={item} />
			))}
		</OrderBox>
	)
}

const ItemBox = styled.div`
	display: flex;
	align-items: center;
	margin: 20px 0;
	.image {
		height: 70px;
		width: 150px;
		margin-right: 15px;
		img {
			border-radius: 7px;
			height: 100%;
			width: auto;
		}
	}
	.item-details {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.size,
		.qty {
			font-size: 0.85rem;
		}
		.price {
			font-size: 1.3rem;
			font-weight: 500px;
		}
	}
`
function Item({ item }) {
	const { products } = useContext(UserContext)
	console.log("item", item)
	products.products.forEach(product => {
		if (Number(product.id) === Number(item.product_id)) {
			console.log(item)
			item.image = product.image
			item.name = product.name
			console.log(item.image)
		}
	})
	return (
		<ItemBox>
			<div className="image">
				<img width="50" src={item.image} alt="" />
			</div>
			<div className="item-details">
				<div className="left">
					<div>{item.name}</div>
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
