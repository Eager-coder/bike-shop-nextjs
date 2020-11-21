import styled from "styled-components"
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
				.payment {
					img {
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
	.logo > img {
		width: 132px;
		margin-right: 50px;
		filter: invert(1);
	}
	.social-media {
		margin-left: 100px;
		display: flex;
	}
	.social-media > div {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		padding: 10px;
		width: 54px;
		height: 54px;
		background-color: rgb(44, 44, 44);
		margin-left: 20px;
	}
	.fab {
		font-size: 30px;
		color: white;
		transition: 0.2s;
	}
	.fab:hover {
		color: rgb(22, 190, 0);
	}
	a {
		text-decoration: none;
		color: white;
		margin: 10px 0;
	}
	a:hover {
		color: rgb(22, 190, 0);
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
			padding: 50px 100px;
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
			<div class="container">
				<div class="flex-container">
					<div className="left">
						<div class="logo">
							<img src="https://focus-bike-shop.vercel.app/icons/logo.png" alt="" />
						</div>
						<div className="payment">
							<img src="https://focus-bike-shop.vercel.app/icons/visa.png" alt="" />
							<img src="https://focus-bike-shop.vercel.app/icons/mastercard.png" alt="" />
							<img src="https://focus-bike-shop.vercel.app/icons/ae.png" alt="" />
							<img src="https://focus-bike-shop.vercel.app/icons/diners.png" alt="" />
							<img src="https://focus-bike-shop.vercel.app/icons/jcb.png" alt="" />
						</div>
					</div>

					<div class="links">
						<div class="link-column">
							<span class="column-name">SHOP</span>
							<a href="#" class="link">
								About
							</a>
							<a href="#" class="link">
								Jobs
							</a>
							<a href="#" class="link">
								For the Record
							</a>
						</div>
						<div class="link-column">
							<span class="column-name">HELP & SERVICE</span>
							<a href="#" class="link">
								For Artists
							</a>
							<a href="#" class="link">
								Developers
							</a>
							<a href="#" class="link">
								Brands
							</a>
							<a href="#" class="link">
								Investors
							</a>
							<a href="#" class="link">
								Vendors
							</a>
						</div>
					</div>
					<div class="social-media">
						<div>
							<i class="fab fa-instagram"></i>
						</div>
						<div>
							<i class="fab fa-twitter"></i>
						</div>
						<div>
							<i class="fab fa-facebook-f"></i>
						</div>
					</div>
				</div>

				<div class="bottom-items">
					<ul class="bottom-links">
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
						<li>
							<a href="#">About Ads</a>
						</li>
						<li>
							<a href="#">Additional CA Privacy Disclosures</a>
						</li>
					</ul>
					<div class="date">
						<span>© 2020 Focus AB</span>
					</div>
				</div>
			</div>
		</StyledFooter>
	)
}
