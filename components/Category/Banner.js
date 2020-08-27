import React from "react"
import styled from "styled-components"
const Div = styled.div`
	width: 100%;
	height: 350px;
	background: url(/images/bikes.jpg) no-repeat;
	background-size: cover;
	background-position: 0 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	&::after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgb(0, 0, 0, 0.2);
	}
	h1 {
		color: white;
		font-size: 4.5rem;
		z-index: 1;
	}
`
export default function Banner({ heading }) {
	return (
		<Div>
			<h1>{heading === "Bmx" ? "BMX" : heading}</h1>
		</Div>
	)
}
