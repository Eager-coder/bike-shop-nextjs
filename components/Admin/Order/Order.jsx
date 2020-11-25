import { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import Context from "../../Context"
import moment from "moment"
import Popup from "../../Popup"
const OrderBox = styled.div`
	width: 100%;
	border-radius: 4px;
	box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
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
		.left {
			.user {
				display: flex;
				flex-direction: column;
				span {
					margin: 5px 0;
				}
			}
		}
		.right {
			text-align: right;
			> div {
				margin: 5px 0;
			}
		}
		span {
			font-weight: 500;
		}
		.update-btn {
			margin-top: 10px;
			cursor: pointer;
			border: none;
			border-radius: 5px;
			background: black;
			color: white;
			padding: 3px 5px;
			box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
		}
	}
`
const Status = styled.span`
	padding: 2px 4px;
	border-radius: 5px;
	${({ sts }) => {
		if (sts === "processing") {
			return "color: white; background: orange;"
		} else if (sts === "shipped") {
			return "color: white; background: purple;"
		} else if (sts === "completed") {
			return "color: white; background: green;"
		} else if (sts === "cancelled") {
			return "color: white; background: red;"
		} else if (sts === "on hold") {
			return "color: white; background: grey;"
		}
	}};
`
const UpdateStatus = styled.div`
	border-radius: 4px;
	box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
	padding: 30px 40px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	.info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		span {
			margin: 10px 0;
		}
	}
	select {
		width: 120px;
		font-size: 1rem;
		option {
			height: 30px;
		}
	}
	.buttons {
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		width: 100%;
		button {
			font-size: 1.1rem;
			margin-top: 10px;
			cursor: pointer;
			border: none;
			border-radius: 4px;
			padding: 3px 5px;
		}
		button.update {
			background: black;
			color: white;
		}
	}
`
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
		name,
		surname,
		email,
	} = order
	console.log(name, surname, email)
	return (
		<OrderBox>
			<div className="id-total">
				<span className="order-id">Order ID: {order_id}</span>
				<span className="total">Total: ${total}.00</span>
			</div>

			<div className="details">
				<div className="left">
					<div className="user">
						<span>
							<b>Name: </b> {name}
						</span>
						<span>
							<b>Surname: </b> {surname}
						</span>
						<span>
							<b>Email: </b> {email}
						</span>
					</div>
					<div className="addres">
						<b>Address:</b> {address_line}, {city}, <br /> {state}, {country},{" "}
						{zip_code}
					</div>
				</div>
				<div className="right">
					<div className="time-created">
						<b>Time ordered:</b> <br /> {moment(created_at).format("LLL")}
					</div>
					<div className="status">
						<b>Status:</b>
						<Status sts={status}>{status}</Status>
					</div>
					{status !== "completed" ? (
						<>
							<button
								className="update-btn"
								onClick={() => setUpdateOpen(true)}>
								Update Status
							</button>
							{isUpdateOpen ? (
								<Popup>
									<UpdateStatus>
										<div className="info">
											<span>Order ID: {order_id}</span>
											<span>
												Current stattus: <b>{status}</b>
											</span>
										</div>
										<div>Select new status:</div>
										<select onInput={e => setStatus(e.target.value)}>
											<option></option>
											<option value="processing">processing</option>
											<option value="on hold">on hold</option>
											<option value="shipped">shipped</option>
											<option value="cancelled">cancelled</option>
										</select>
										<div className="buttons">
											<button
												className="update"
												onClick={() =>
													updateStatus(order_id, newStatus, setUpdateOpen)
												}>
												Update
											</button>
											<button
												className="cancel"
												onClick={() => setUpdateOpen(false)}>
												Cancel
											</button>
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
