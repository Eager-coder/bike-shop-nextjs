import { useContext, useState } from "react"
import styled from "styled-components"
import Context from "../../Context"
import moment from "moment"
import Popup from "../../Popup"
import Loading from "../../Loading"
import OrderItem from "./OrderItem"

export default function Order({ order, getOrders }) {
	const [isPopupOpen, setPopupOpen] = useState(false)
	const [isConfirmLoading, setIsConfirmLoading] = useState(false)
	const { products } = useContext(Context)
	console.log(products)
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
	const completeOrder = async order_id => {
		setIsConfirmLoading(true)
		const res = await fetch(
			`/api/user/order?order_id=${order_id}&isComplete=true`,
			{
				method: "PUT",
			}
		)
		const json = await res.json()
		if (json.isSuccess) {
			setIsConfirmLoading(false)
			setPopupOpen(false)
			getOrders()
		}
	}
	return (
		<OrderBox status={status}>
			<div className="id-total">
				<span className="order-id">Order ID: {order_id}</span>
				<span className="total">Total: ${total}.00</span>
			</div>

			<div className="details">
				<div className="left">
					<div className="addres">
						<span>Address:</span> {address_line}, {city}, <br /> {state},{" "}
						{country}, {zip_code}
					</div>
					<div className="time-created">
						<span>Time ordered:</span> {moment(created_at).format("LLL")}
					</div>
				</div>
				<div className="right">
					<div className="status-box">
						<span>Status: </span>
						<span className="status">{status}</span>
					</div>
					{status !== "completed" ? (
						<>
							<button
								className="btn-complete"
								onClick={() => setPopupOpen(true)}>
								Confirm completion
							</button>
							{isPopupOpen ? (
								<Popup>
									{isConfirmLoading ? (
										<Loading size="120" />
									) : (
										<Confirm>
											<p>
												You are going to comfirm your order with ID: {order_id}
											</p>
											<div className="btns">
												<button
													className="confirm"
													onClick={() => completeOrder(order_id)}>
													Confirm
												</button>
												<button
													className="cancel"
													onClick={() => setPopupOpen(false)}>
													Cancel
												</button>
											</div>
										</Confirm>
									)}
								</Popup>
							) : null}
						</>
					) : null}
				</div>
			</div>

			{items.map((item, index) => (
				<OrderItem key={index} item={item} products={products} />
			))}
		</OrderBox>
	)
}

const Confirm = styled.div`
	display: flex;
	max-width: 350px;
	flex-direction: column;
	border-radius: 4px;
	box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
	background: white;
	padding: 20px;
	p {
		font-size: 1.2rem;
		margin-bottom: 20px;
	}
	.btns {
		margin: 10px 0;
		display: flex;
		justify-content: space-between;
		.confirm {
			font-size: 1.2rem;
			cursor: pointer;
			border: none;
			border-radius: 5px;
			background: black;
			color: white;
			padding: 2px 5px;
		}
		.cancel {
			font-size: 1.2rem;
			padding: 2px 5px;
			cursor: pointer;
			border: none;
			border-radius: 5px;
		}
	}
`
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
		margin: 10px 0;
		display: flex;
		justify-content: space-between;
		span {
			font-weight: 500;
		}
	}
	.btn-complete {
		margin-top: 10px;
		cursor: pointer;
		border: none;
		border-radius: 5px;
		background: black;
		color: white;
		padding: 2px 5px;
	}
	.status {
		padding: 0 5px;
		font-size: 0.9rem;
		border-radius: 5px;
		${({ status }) => {
			if (status === "processing") {
				return "color: white; background: orange;"
			} else if (status === "shipped") {
				return "color: white; background: purple;"
			} else if (status === "completed") {
				return "color: white; background: green;"
			} else if (status === "cancelled") {
				return "color: white; background: red;"
			} else if (status === "on hold") {
				return "color: white; background: grey;"
			}
		}};
	}
	@media (max-width: 768px) {
		padding: 20px;
		.id-total {
			.order-id,
			.total {
				font-size: 1rem;
			}
		}
		.details {
			font-size: 0.85rem;
		}
	}
`
