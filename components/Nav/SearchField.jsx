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
	input {
		width: 200px;
		border: none;
		font-size: 1rem;
		@media (max-width: 1024px) {
			width: 150px;
		}
		@media (max-width: 768px) {
			width: 100px;
		}
	}
`

export default function SearchField() {
	const [text, setText] = useState("")
	const router = useRouter()
	const search = e => {
		if (e.key === "Enter" && text.trim()) {
			router.push(`/search?word=${text}`)
		}
	}
	return (
		<Container>
			<img src="https://www.flaticon.com/svg/static/icons/svg/54/54481.svg" alt="" />
			<input
				type="text"
				placeholder="Search"
				value={text}
				onChange={e => {
					setText(e.target.value)
				}}
				onKeyDown={e => search(e)}
			/>
		</Container>
	)
}
