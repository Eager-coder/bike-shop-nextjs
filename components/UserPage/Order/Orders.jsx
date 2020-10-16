import styled from "styled-components"

const OrderContainer = styled.section`
	width: 100%;
	h1 {
		font-size: 2.2rem;
		text-transform: uppercase;
		font-weight: 500;
		margin-bottom: 40px;
	}
	@media (max-width: 768px) {
		h1 {
			font-size: 1.7rem;
		}
	}
`
import Order from "./Order"
export default function Orders({ orders, getOrders }) {
	return (
		<OrderContainer>
			<h1>Orders</h1>
			{orders.length
				? orders.map(order => <Order key={order.id} order={order} getOrders={getOrders} />)
				: null}
		</OrderContainer>
	)
}
