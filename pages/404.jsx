import Layout from "../components/Layout"
import styled from "styled-components"
import Link from "next/link"
const Container = styled.div`
	margin: 0 auto;
	max-width: 1400px;
	padding: 0 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.text {
		width: 50%;
		h1 {
			font-size: 3.5rem;
		}
		p {
			color: #3f3f3f;
			font-size: 1.2rem;
			margin: 10px 0;
		}
		a {
			display: block;
			width: max-content;
			padding: 5px 10px;
			background: black;
			color: white;
			font-weight: 600;
			font-size: 1.2rem;
			border-radius: 4px;
			margin-top: 20px;
		}
	}
	img {
		width: 50%;
	}
	@media (max-width: 1024px) {
		.text {
			h1 {
				font-size: 2.5rem;
			}
			p {
				font-size: 1rem;
			}
			a {
				font-size: 1rem;
			}
		}
	}
	@media (max-width: 768px) {
		flex-direction: column;
		padding: 0 20px;
		margin-top: 100px;
		img {
			width: 80%;
		}
		.text {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			h1,
			p {
				text-align: center;
			}
			a {
				font-size: 1rem;
			}
		}
	}
	@media (max-width: 640px) {
		flex-direction: column;
		.text {
			h1 {
				font-size: 2rem;
				text-align: center;
			}
			p {
				text-align: center;

				font-size: 1rem;
			}
		}
	}
`
export default function ErrorPage() {
	return (
		<Layout>
			<Container>
				<div className="text">
					<h1>
						Oops... <br /> Page not found
					</h1>
					<p>We're sorry, the page you requested could not be found.</p>
					<Link href="/">
						<a>Go back home</a>
					</Link>
				</div>
				<img src="/images/404.jpg" alt="" />
			</Container>
		</Layout>
	)
}
