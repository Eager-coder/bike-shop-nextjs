import styled from 'styled-components'
const Div = styled.div`
	position: relative;
	img {
		width: 100%;
	}
	.text {
		position: absolute;
		left: 10%;
		top: 10%;

		h1 {
			color: white;
			font-size: 3.5rem;
		}
		p {
			color: white;
			width: 500px;
			margin: 20px 0 40px 0;
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
	}
`
import Link from 'next/link'
export default function Hero() {
	return (
		<Div className='hero'>
			<div className='hero-container'>
				<img src='images/black-bike.jpg' alt='' />
				<div className='text'>
					<h1>Crazy light, crazy fast</h1>
					<p>
						The all-new Émonda. Lorem ipsum, dolor sit amet consectetur
						adipisicing elit. Quos eos alias rerum quas error quibusdam.
					</p>
					<Link href='/' passHref>
						<a>Shop now</a>
					</Link>
				</div>
			</div>
		</Div>
	)
}
