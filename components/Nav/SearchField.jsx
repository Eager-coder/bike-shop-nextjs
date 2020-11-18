import { useRouter } from "next/router"
import styled from "styled-components"
import { useState, useContext } from "react"

const Container = styled.div`
	width: max-content;
	background-color: white;
	height: 2rem;
	display: flex;
	align-items: center;
	border-radius: 4px;
	margin-right: 15px;
	img {
		width: auto;
		height: 20px;
		padding: 0 7px;
	}
	input.desktop {
		width: 200px;
		border: none;
		font-size: 1rem;
		@media (max-width: 1024px) {
			width: 150px;
		}
	}
	@media (max-width: 768px) {
		background: none;
		input.desktop {
			display: none;
		}
		img {
			filter: invert(1);
			padding: 0px;
		}
	}
`
const Mobile = styled.div`
	display: none;
	@media (max-width: 768px) {
		display: block;
		position: absolute;
		background: black;
		height: 4rem;
		z-index: 4;
		left: 0;
		right: 0;
		top: ${({ isOpen }) => (isOpen ? "0" : "-4rem")};
		transition: 0.3s;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		input.mobile {
			width: calc(100% - 50px);
			background: white;
			height: 2.5rem;
			font-size: 1.2rem;
			border: none;
			padding: 0 10px;
		}
		.close {
			font-size: 1.5rem;
			font-weight: 900;
			color: white;
		}
	}
`

export default function SearchField() {
	const [text, setText] = useState("")
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const search = e => {
		if (e.key === "Enter" && text.trim()) {
			router.push(`/search?word=${text}`)
		}
	}
	return (
		<Container>
			<img
				src="https://www.flaticon.com/svg/static/icons/svg/54/54481.svg"
				alt=""
				onClick={() => setIsOpen(true)}
			/>
			<input
				className="desktop"
				type="text"
				placeholder="Search"
				value={text}
				onChange={e => {
					setText(e.target.value)
				}}
				onKeyDown={e => search(e)}
			/>
			<Mobile isOpen={isOpen}>
				<input
					className="mobile"
					type="text"
					placeholder="Search"
					value={text}
					onChange={e => {
						setText(e.target.value)
					}}
					onKeyDown={e => search(e)}
				/>
				<div className="close" onClick={() => setIsOpen(false)}>
					&#10005;
				</div>
			</Mobile>
		</Container>
	)
}
