import styled from "styled-components"
import Link from "next/link"
const StyledFooter = styled.footer`
	background-color: black;
	.container {
		max-width: 1300px;
		margin: 0 auto;
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
				.payment {
					img {
						margin: 5px 10px 5px 0;
						width: 40px;
					}
				}
			}
		}
	}

	.links {
		display: flex;
		justify-content: space-evenly;
		width: 50%;
	}
	.link-column {
		display: flex;
		flex-direction: column;
	}

	.social-media {
		/* margin-left: 100px; */
		display: flex;
		img {
			width: 100%;
			height: auto;
			filter: invert(1);
			transition: 0.2s;
			::hover {
				filter: initial;
				fill: orange;
			}
		}
		svg {
			fill: red;
		}
	}
	.social-media > a {
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
	}

	a {
		text-decoration: none;
		color: white;
		margin: 10px 0;
	}
	a:hover {
		color: #ff4834;
		transition: 0.2s;
	}
	span {
		color: gray;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 1px;
		margin: 10px 0;
	}
	.bottom-items {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.bottom-links {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	li {
		margin-right: 20px;
	}
	li > a {
		font-size: 0.8rem;
		color: gray;
	}
	.date > span {
		letter-spacing: 0.5px;
		font-weight: normal;
		font-size: 0.8rem;
		color: #8a9496;
	}
	@media screen and (max-width: 1000px) {
		.container {
			/* padding: 50px 100px; */
		}
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
		}
		.social-media > div {
			margin: 0;
			margin-right: 20px;
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
		.container {
			padding: 20px 15px;
		}
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
						<div className="payment">
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
						</div>
					</div>

					<div className="links">
						<div className="link-column">
							<span className="column-name">SHOP</span>
							<a href="#" className="link">
								About
							</a>
							<a href="#" className="link">
								Jobs
							</a>
							<a href="#" className="link">
								For the Record
							</a>
						</div>
						<div className="link-column">
							<span className="column-name">HELP & SERVICE</span>
							<a href="#" className="link">
								For Artists
							</a>
							<a href="#" className="link">
								Developers
							</a>
							<a href="#" className="link">
								Brands
							</a>
							<a href="#" className="link">
								Investors
							</a>
							<a href="#" className="link">
								Vendors
							</a>
						</div>
					</div>
					<div className="social-media">
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
						<div></div>
					</div>
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
