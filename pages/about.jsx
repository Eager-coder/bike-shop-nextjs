import styled from "styled-components"
import Layout from "../components/Layout"
const Container = styled.div`
	.mission {
		background-color: black;
		position: relative;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: right;
			opacity: 0.4;
		}
		.mission-text {
			position: absolute;
			top: 10%;
			left: 50%;
			transform: translateX(-50%);
			width: 800px;
			text-transform: uppercase;
			color: white;

			span {
				display: block;
				font-size: 1.5rem;
				font-weight: 700;
				text-align: center;
				margin-bottom: 20px;
			}
			h1 {
				font-size: 4rem;
				text-align: center;
				font-weight: 700;
			}
		}
	}
	.history {
		margin: 200px auto;
		width: 100%;
		max-width: 1000px;
		height: max-content;
		padding: 0 20px;
		@include tablet() {
			margin: 100px 0;
		}
		h2 {
			font-size: 3.5rem;
			font-weight: 400;
			text-transform: uppercase;
		}
		p {
			font-size: 1.5rem;
			font-weight: 300;
			color: rgb(53, 53, 53);
		}
	}
	.management {
		width: 100%;
		padding: 0 20px;
		margin: 0 auto;
		h2 {
			text-transform: uppercase;
			font-size: 2rem;
			font-weight: 400;
			color: rgb(187, 3, 3);
			padding-bottom: 20px;
			border-bottom: 2px solid rgb(187, 3, 3);
			margin: 50px 0 50px 100px;
			width: 500px;
			@include tablet() {
				font-size: 1.5rem;
				width: 400px;
				margin-left: 50px;
			}
			@include mobile() {
				font-size: 1.2rem;
				font-weight: 500;
				width: 250px;
			}
		}
		.flex-container {
			display: flex;
			justify-content: space-between;
			width: 100%;
			@include laptop() {
				flex-direction: column;
			}
			.flex-item {
				width: 31vw;
				position: relative;
				@include laptop() {
					width: 100%;
					margin-bottom: 20px;
				}
				&::after {
					content: "";
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					bottom: 0;
					right: 0;
					left: 0;
					background: radial-gradient(transparent 50%, black 150%);
				}
				.member-img {
					width: 100%;
					img {
						width: 100%;
					}
				}
				.member-info {
					position: absolute;
					z-index: 1;
					bottom: 20px;
					left: 20px;
					span {
						display: block;
						color: white;
						text-transform: uppercase;
					}
					.name {
						font-weight: 600;
					}
					.position {
						font-weight: 300;
					}
				}
			}
		}
	}
	.figures {
		width: 100%;
		max-width: 1340px;
		margin: 200px auto;
		padding: 0 20px;
		@include tablet() {
			margin: 30px auto;
		}
		h2 {
			font-size: 3rem;
			color: rgb(17, 17, 17);
			text-transform: uppercase;
			margin: 30px 0;
			@include mobile() {
				font-size: 2rem;
			}
		}
		.figures-flex {
			display: flex;
			justify-content: space-between;
			width: 100%;
			@include laptop() {
				flex-wrap: wrap;
			}
			.figure {
				margin-bottom: 30px;
				.figure-text {
					width: 200px;
				}
				@include laptop() {
					width: 50%;
				}
				@include tablet() {
					width: 100%;
				}
			}
			h3 {
				font-size: 3.5rem;
				font-weight: 900;
				color: rgb(53, 53, 53);
				@include mobile() {
					font-size: 3rem;
				}
			}
			span {
				font-size: 1.5rem;
				text-transform: uppercase;
				color: rgb(2, 2, 2);
				font-weight: 700;
			}
		}
	}
`

export default function About() {
	return (
		<Layout>
			<Container>
				<section class="mission">
					<img src="./images/about-hero.jpg" alt="" />
					<div class="mission-text">
						<span>Our mission:</span>
						<h1>
							Support cyclist of all levels by providing the highest quality
							service, products and experience
						</h1>
					</div>
				</section>
				<section class="history">
					<h2>History</h2>
					<p>
						We were born on September 1st 2009. Today we are team of more than
						20 people in-house, but we also collaborate with agents,
						distributors photographers and ambassadors from all over the world.{" "}
					</p>
				</section>

				<section class="management">
					<h2>management board</h2>
					<div class="flex-container">
						<div class="flex-item">
							<div class="member-img">
								<img
									src="https://about.puma.com/-/media/images/investor-relations/m-22_puma_annual-report_-1673_new.ashx?as=1&h=675&iar=1&w=600&hash=717ABD4E16214E555EB93376535620CAD866EB9A"
									alt=""
								/>
							</div>

							<div class="member-info">
								<span class="name">Bjørn Gulden</span>
								<span class="position">CEO</span>
							</div>
						</div>
						<div class="flex-item">
							<div class="member-img">
								<img
									src="https://about.puma.com/-/media/images/investor-relations/m-22_puma_annual-report_-459.ashx?as=1&h=675&iar=1&w=600&hash=7B612F9D6C9D1C243BDC6590849970E33689266C"
									alt=""
								/>
							</div>
							<div class="member-info">
								<span class="name">Michael Lämmermann</span>
								<span class="position">CFO</span>
							</div>
						</div>
						<div class="flex-item">
							<div class="member-img">
								<img
									src="https://about.puma.com/-/media/images/this-is-puma/m-22-anne-laure-descours-2.ashx?as=1&h=675&iar=1&w=600&hash=464AC71D730041A8D4646E06EFF75AE5EB1FDAF3"
									alt=""
								/>
							</div>
							<div class="member-info">
								<span class="name">Anne-Laure Descours</span>
								<span class="position">CSO</span>
							</div>
						</div>
					</div>
				</section>

				<section class="figures">
					<h2>Vertexwear in figures</h2>
					<div class="figures-flex">
						<div class="figure">
							<div class="figure-text">
								<h3>5.5</h3>
								<span>billion euro sales in 2019</span>
							</div>
						</div>

						<div class="figure">
							<div class="figure-text">
								<h3>440</h3>
								<span>million euros ebit in 2019</span>
							</div>
						</div>

						<div class="figure">
							<div class="figure-text">
								<h3>≈14,700</h3>
								<span>employees</span>
							</div>
						</div>

						<div class="figure">
							<div class="figure-text">
								<h3>2009</h3>
								<span>year of birth</span>
							</div>
						</div>
					</div>
				</section>
			</Container>
		</Layout>
	)
}
