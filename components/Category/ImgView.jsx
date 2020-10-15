import { useState } from "react"
import styled from "styled-components"
const ImageContainer = styled.div`
	width: 55%;
	margin-right: 5%;
	img {
		cursor: pointer;
		width: 100%;
		height: auto;
	}
	@media (max-width: 768px) {
		width: 100%;
		margin: 0;
	}
`
const ImgFull = styled.div`
	position: fixed;
	z-index: 1;
	top: 4rem;
	bottom: 0;
	left: 0;
	right: 0;
	background: white;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		max-height: 90%;
		max-width: 100%;
		height: auto;
		width: auto;
	}
`
export default function ImgView({ image }) {
	const [isImgFull, setImgFull] = useState(false)
	return (
		<ImageContainer className="image">
			<img src={image} alt="" onClick={() => setImgFull(true)} />
			{isImgFull ? (
				<ImgFull className="full-img" onClick={() => setImgFull(false)}>
					<img src={image} alt={name} />
				</ImgFull>
			) : (
				""
			)}
		</ImageContainer>
	)
}
