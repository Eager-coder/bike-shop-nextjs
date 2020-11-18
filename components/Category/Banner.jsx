import React from "react"
import styled from "styled-components"
const Div = styled.div`
	width: 100%;
	height: 350px;
	background: url(${({ image }) => image}) no-repeat;
	background-size: cover;
	background-position: 0 50%;
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
		background: rgb(0, 0, 0, 0.5);
	}
	h1 {
		color: white;
		font-size: 4.5rem;
		z-index: 1;
	}
`
export default function Banner({ heading, image }) {
	return (
		<Div image={image}>
			<h1>{heading === "Bmx" ? "BMX" : heading}</h1>
		</Div>
	)
}
