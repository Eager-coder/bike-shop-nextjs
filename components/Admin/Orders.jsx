import { useState, useEffect } from "react"
import styled from "styled-components"

const OrderContainer = styled.section`
	display: flex;
	width: 100%;
	flex-direction: column;
`
import Order from "../../components/UserPage/Order"
export default function Orders({ orders }) {
	return (
		<OrderContainer>
			{orders.length ? orders.map(order => <Order order={order} />) : null}
		</OrderContainer>
	)
}
