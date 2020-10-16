import styled from "styled-components"
import Link from "next/link"
const Div = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.582);
	z-index: 2;
	.item-box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 480px;
		height: 350px;
		background-color: white;
		position: fixed;
		z-index: 2;
		top: 100px;
		right: 20px;
		padding: 20px;
		@media (max-width: 640px) {
			right: 0;
			width: 100%;
			height: 300px;
		}
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 1.2rem;
			font-weight: 500;
			span {
				display: flex;
				justify-content: space-between;
				align-items: center;
				img {
					width: 40px;
					margin-right: 20px;
				}
			}
			.btn-close {
				cursor: pointer;
				::after {
					height: max-content;
					content: "\\00D7";
					font-size: 2.5rem;
					font-weight: 400;
				}
			}
		}
		.flex {
			display: flex;
			justify-content: space-between;
			img {
				height: 120px;
				width: auto;
			}
			@media (max-width: 640px) {
				img {
					height: 80px;
				}
				.item-name {
					font-size: 0.85rem;
					margin: 0 5px;
				}
			}
		}
		.cart-link {
			display: flex;
			justify-content: space-between;
			align-items: center;
			a {
				cursor: pointer;
				background-color: black;
				color: rgba(255, 255, 255, 0.897);
				transition: 0.2s;
				width: 200px;
				height: 50px;
				border-radius: 4px;
				display: flex;
				justify-content: center;
				align-items: center;
				@media (max-width: 640px) {
					width: 120px;
				}
			}
		}
	}
`
export default function CartPopup({ item, setIsOpen }) {
	return (
		<Div>
			<div className="item-box">
				<div className="top">
					<span>
						<img
							className="icon-tick"
							src="https://img.icons8.com/material-sharp/100/000000/checked-2.png"
							alt=""
						/>
						Item added to your cart
					</span>
					<div onClick={() => setIsOpen(false)} className="btn-close"></div>
				</div>
				<div className="flex">
					<img className="item-image" src={item.image} alt="" />
					<div className="item-name">{item.name}</div>
					<div className="item-price">${item.price}</div>
				</div>
				<div className="cart-link">
					<Link href="/cart">
						<a>View cart</a>
					</Link>
				</div>
			</div>
		</Div>
	)
}
/*
	& > div {
		flex-direction: column;
		justify-content: space-between;
		width: 480px;
		height: 350px;
		background-color: white;
		position: fixed;
		z-index: 2;
		top: 100px;
		right: 20px;
		padding: 20px;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			span {
				display: flex;
				justify-content: space-between;
				align-items: center;
				img {
					width: 40px;
				}
			}
			.btn-close {
				::after {
					content: "\00D7";
					font-size: 1.5rem;
					font-weight: 600;
				}
			}
		}
		.flex {
			display: flex;
			justify-content: space-between;
			img {
				height: 150px;
				width: auto;
			}
		}
	}

	*/
