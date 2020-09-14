import styled from "styled-components"

const Div = styled.div`
	grid-area: ${props => (props.area === "top" ? "top" : "bottom")};
	position: relative;

	&::after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba($color: #000000, $alpha: 0.2);
	}
	.textbox {
		position: absolute;
		top: 10%;
		right: 10%;
		z-index: 1;
		h2 {
			color: white;
			font-size: 2rem;
			max-width: 400px;
			margin-bottom: 30px;
			text-align: right;
		}
		a {
			display: flex;
			width: max-content;
			padding: 10px 20px;
			border-radius: 4px;
			border: black 2px solid;
			color: black;
			font-size: 1.2rem;
			font-weight: 600;
			background-color: white;
			align-items: center;
			justify-content: center;
			transition: 0.2s;
			float: right;
			&:hover {
				background-color: black;
				color: white;
				border: white 2px solid;
			}
		}
		@media (max-width: 480px) {
			h2 {
				font-size: 1.5rem;
			}
			a {
				font-size: 1rem;
			}
		}
	}
`
export default function ProductSmall({ children, area }) {
	return (
		<Div area={area} className="product-top">
			{children}
		</Div>
	)
}
