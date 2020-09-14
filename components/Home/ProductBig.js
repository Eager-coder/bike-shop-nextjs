import styled from "styled-components"
import Link from "next/link"
const Div = styled.div`
	grid-area: left;
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
		top: 30%;
		left: 10%;
		z-index: 1;
		h2 {
			color: white;
			font-size: 2.5rem;
			margin-bottom: 30px;
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
			&:hover {
				background-color: black;
				color: white;
				border: white 2px solid;
			}
		}
		@media (max-width: 1000px) {
			top: 10%;
			right: 10%;
			h2 {
				text-align: right;
				font-size: 2rem;
			}
			a {
				float: right;
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

export default function ProductBig() {
	return (
		<Div className="product-left">
			<img
				src="https://i.pinimg.com/originals/6a/af/de/6aafdebf5ad5ad6f4ce6d2f7da7bd790.jpg"
				alt=""
			/>
			<div className="textbox">
				<h2>Are you ready to shred mountains?</h2>
				<Link href="/">
					<a>See mountain bikes</a>
				</Link>
			</div>
		</Div>
	)
}
