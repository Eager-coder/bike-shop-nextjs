import { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import Context from "../../Context"
import moment from "moment"
import Popup from "../../Popup"
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
		margin: 20px 0;
		display: flex;
		justify-content: space-between;
		span {
			font-weight: 500;
		}
	}
`
const Status = styled.span`
	padding: 2px 4px;
	border-radius: 5px;
	background: ${({ sts }) => {
		if (sts === "processing") {
			return "orange;"
		} else if (sts === "shipped") {
			return "purple;"
		} else if (sts === "delivered") {
			return "green;"
		}
	}};
`
const UpdateStatus = styled.div``
export default function Order({ order, updateStatus }) {
	const [newStatus, setStatus] = useState(null)
	const [isUpdateOpen, setUpdateOpen] = useState(false)
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
						<Status sts={status}>{status}</Status>
					</div>
					{status !== "completed" ? (
						<>
							<button onClick={() => setUpdateOpen(true)}>Update Status</button>
							{isUpdateOpen ? (
								<Popup>
									<UpdateStatus>
										<div>Order ID: {order_id}</div>
										<div>Select new status</div>
										<select onInput={e => setStatus(e.target.value)}>
											<option></option>
											<option value="processing">processing</option>
											<option value="on hold">on hold</option>
											<option value="shipped">shipped</option>
											<option value="cancelled">cancelled</option>
										</select>
										<div className="buttons">
											<button onClick={() => updateStatus(order_id, newStatus, setUpdateOpen)}>
												Update
											</button>
											<button onClick={() => setUpdateOpen(false)}>Cancel</button>
										</div>
									</UpdateStatus>
								</Popup>
							) : null}
						</>
					) : null}
				</div>
			</div>
			{items.map(item => (
				<Item key={item.name} item={item} />
			))}
		</OrderBox>
	)
}

const ItemBox = styled.div`
	border-top: rgba(0, 0, 0, 0.2) 1px solid;
	padding-top: 10px;
	display: flex;
	align-items: center;
	margin: 20px 0;
	.image {
		height: 50px;
		width: 120px;
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
	const { products } = useContext(Context)
	useEffect(() => {
		if (products.length) {
			products.products.forEach(product => {
				if (Number(product.id) === Number(item.product_id)) {
					console.log(item)
					item.image = product.image
					item.name = product.name
					console.log(item.image)
				}
			})
		}
	}, [products])

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
