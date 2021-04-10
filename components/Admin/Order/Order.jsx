import { useState } from "react"
import styled from "styled-components"
import moment from "moment"
import Modal from "../../Modal"
import { BtnSecondary, BtnPrimary } from "../../Buttons"
import { client } from "../../../client"
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

export default function Order({ order, getOrders }) {
	const [newStatus, setStatus] = useState(null)
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

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
	const updateStatus = async (order_id, newStatus) => {
		setIsLoading(true)
		if (!newStatus) return setUpdateModalOpen(false)
		const { ok } = await client(
			`/api/admin/orders?order_id=${order_id}&newStatus=${newStatus}`,
			"PUT"
		)
		if (ok) {
			setUpdateModalOpen(false)
			getOrders()
		}
		setIsLoading(false)
	}
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
						<b>Address:</b> {address_line}, {city}, <br /> {state}, {country}, {zip_code}
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
							<button className="update-btn" onClick={() => setUpdateModalOpen(true)}>
								Update Status
							</button>
							{isUpdateModalOpen ? (
								<Modal isForm>
									{/* <UpdateStatus> */}
									<div className="info">
										<h2>Update order status</h2>
										<p>Order ID: {order_id}</p>
										<p>
											Current stattus: <b>{status}</b>
										</p>
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
										<BtnPrimary
											label="Update"
											disabled={isLoading}
											onClick={() => updateStatus(order_id, newStatus)}
										/>
										<BtnSecondary
											label="Cancel"
											disabled={isLoading}
											onClick={() => setUpdateModalOpen(false)}
										/>
									</div>
									{/* </UpdateStatus> */}
								</Modal>
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
