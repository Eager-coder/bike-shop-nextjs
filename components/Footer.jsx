import styled from "styled-components"
import Link from "next/link"
const StyledFooter = styled.footer`
	background-color: black;
	.container {
		max-width: 1300px;
		margin: 0 auto;
		margin-top: 150px;
		padding: 80px 20px;
		.flex-container {
			display: flex;
			justify-content: space-between;
			margin-bottom: 150px;
			width: 100%;
			.left {
				.logo {
					display: block;
					margin-bottom: 50px;
					img {
						width: 150px;
						margin-right: 50px;
						filter: invert(1);
					}
				}
			}
			.links {
				display: flex;
				justify-content: space-evenly;
				width: 50%;
				.link-column {
					display: flex;
					flex-direction: column;
					span {
						color: gray;
						font-size: 0.8rem;
						font-weight: 700;
						letter-spacing: 1px;
						margin: 10px 0;
					}
					a {
						text-decoration: none;
						color: white;
						margin: 10px 0;
						:hover {
							color: #ff4834;
							transition: 0.2s;
						}
					}
				}
			}
		}
		.bottom-items {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.bottom-links {
				display: flex;
				justify-content: space-between;
				align-items: center;
				li {
					margin-right: 20px;
					a {
						font-size: 0.8rem;
						color: gray;
					}
				}
				.date > span {
					letter-spacing: 0.5px;
					font-weight: normal;
					font-size: 0.8rem;
					color: #8a9496;
				}
			}
		}
		@media screen and (max-width: 1000px) {
			.flex-container {
				display: block;
				margin-bottom: 50px;
			}
			.links {
				width: 100%;
				margin: 30px 0 100px 0;
				font-size: 1rem;
			}
			.social-media {
				margin-left: 0;
				div {
					margin: 0;
					margin-right: 20px;
				}
			}

			.bottom-links {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				width: 60%;
				height: 5rem;
			}
			.date > span,
			li > a {
				font-size: 1rem;
			}
		}
		@media screen and (max-width: 770px) {
			padding: 20px 15px;
			.links {
				display: block;
			}
			.link-column {
				margin: 50px 0;
			}
			.bottom-links {
				flex-wrap: nowrap;
				width: unset;
				height: unset;
			}
			.date > span,
			li > a {
				font-size: 0.7rem;
			}
		}
	}
`
const SocialMedia = styled.div`
	display: flex;
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		padding: 10px;
		width: 54px;
		height: 54px;
		background-color: rgb(44, 44, 44);
		margin-left: 20px;
		:hover > img {
			filter: invert(31%) sepia(51%) saturate(2291%) hue-rotate(340deg)
				brightness(115%) contrast(101%);
		}
		img {
			width: 100%;
			height: auto;
			filter: invert(1);
			transition: 0.2s;
		}
	}
`
const PaymentCards = styled.div`
	img {
		margin: 5px 10px 5px 0;
		width: 40px;
	}
`
export default function Footer() {
	return (
		<StyledFooter>
			<div className="container">
				<div className="flex-container">
					<div className="left">
						<Link href="/">
							<a className="logo">
								<img
									src="https://focus-bike-shop.vercel.app/icons/logo.png"
									alt=""
								/>
							</a>
						</Link>
						<PaymentCards>
							<img
								src="https://focus-bike-shop.vercel.app/icons/visa.png"
								alt=""
							/>
							<img
								src="https://focus-bike-shop.vercel.app/icons/mastercard.png"
								alt=""
							/>
							<img
								src="https://focus-bike-shop.vercel.app/icons/ae.png"
								alt=""
							/>
							<br />
							<img
								src="https://focus-bike-shop.vercel.app/icons/discover.png"
								alt=""
							/>
							<img
								src="https://focus-bike-shop.vercel.app/icons/diners.png"
								alt=""
							/>
							<img
								src="https://focus-bike-shop.vercel.app/icons/jcb.png"
								alt=""
							/>
						</PaymentCards>
					</div>

					<div className="links">
						<div className="link-column">
							<span className="column-name">SHOP</span>
							<a href="/about" className="link">
								About us
							</a>
							<a href="#" className="link">
								Jobs
							</a>
							<a href="#" className="link">
								Contact us
							</a>
						</div>
						<div className="link-column">
							<span className="column-name">HELP & SERVICE</span>
							<a href="#" className="link">
								Bike Repair
							</a>
							<a href="#" className="link">
								Payment
							</a>
							<a href="#" className="link">
								Shipping
							</a>
							<a href="#" className="link">
								Return
							</a>
						</div>
					</div>
					<SocialMedia>
						<a href="https://instagram.com" target="_blank">
							<img
								src="https://focus-bike-shop.vercel.app/icons/014-instagram.svg"
								alt=""
							/>
						</a>
						<a href="https://facebook.com" target="_blank">
							<img
								src="https://focus-bike-shop.vercel.app/icons/013-facebook.svg"
								alt=""
							/>
						</a>
						<a href="https://twitter.com" target="_blank">
							<img
								src="https://focus-bike-shop.vercel.app/icons/004-twitter.svg"
								alt=""
							/>
						</a>
					</SocialMedia>
				</div>

				<div className="bottom-items">
					<ul className="bottom-links">
						<li>
							<a href="#">Legal</a>
						</li>
						<li>
							<a href="#">Privacy Center</a>
						</li>
						<li>
							<a href="#">Privacy Policy </a>
						</li>
						<li>
							<a href="#">Cookies</a>
						</li>
					</ul>
					<div className="date">
						<span>© 2020 Focus Bike Shop</span>
					</div>
				</div>
			</div>
		</StyledFooter>
	)
}
