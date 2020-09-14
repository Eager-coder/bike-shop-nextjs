import styled from "styled-components"
const Div = styled.div`
	width: 100%;
	position: relative;
	img {
		width: 100%;
	}
	.text {
		position: absolute;
		left: 0%;
		top: 0%;
		bottom: 0%;
		right: 0%;
		padding: 5% 10%;
		h1 {
			color: white;
			font-size: 3.5rem;
		}
		p {
			color: white;
			max-width: 500px;
			margin: 40px 0;
			font-size: 1.2rem;
		}
		a {
			display: flex;
			width: 120px;
			height: 50px;
			border-radius: 4px;
			border: white 2px solid;
			color: white;
			font-size: 1.2rem;
			font-weight: 600;
			background-color: black;
			align-items: center;
			justify-content: center;
			transition: 0.2s;
			&:hover {
				background-color: white;
				color: black;
			}
		}
		@media (max-width: 768px) {
			h1 {
				font-size: 2.7rem;
			}
			p {
				font-size: 1rem;
				margin: 30px 0;
			}
		}
		@media (max-width: 480px) {
			h1 {
				font-size: 1.5rem;
			}
			p {
				font-size: 0.85rem;
				margin: 20px 0;
			}
			a {
				width: 100px;
				height: 40px;
				font-size: 1rem;
			}
		}
	}
`
import Link from "next/link"
export default function Hero() {
	return (
		<Div className="hero">
			<div className="hero-container">
				<img src="images/black-bike.jpg" alt="" />
				<div className="text">
					<h1>Crazy light, crazy fast</h1>
					<p>
						The all-new Émonda. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos eos
						alias rerum quas error quibusdam.
					</p>
					<Link href="/" passHref>
						<a>Shop now</a>
					</Link>
				</div>
			</div>
		</Div>
	)
}
