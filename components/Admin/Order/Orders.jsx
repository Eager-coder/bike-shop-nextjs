import { useState, useEffect } from "react"
import styled from "styled-components"
import Loading from "../../Loading"
import Order from "./Order"
const OrderContainer = styled.section`
	display: flex;
	width: 100%;
	flex-direction: column;
	h1 {
		font-size: 2.5rem;
		margin-bottom: 30px;
	}
`
export default function Orders({ orders, updateStatus }) {
	return (
		<OrderContainer>
			<h1>Orders</h1>
			{orders ? (
				orders.map(order => <Order key={order.id} order={order} updateStatus={updateStatus} />)
			) : (
				<Loading size="100" />
			)}
		</OrderContainer>
	)
}
