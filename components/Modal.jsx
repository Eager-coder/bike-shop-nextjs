import styled, { createGlobalStyle, css } from "styled-components"
import ReactDOM from "react-dom"
const ModalContainer = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: ${({ bgColor }) => (bgColor ? bgColor : "rgba(0, 0, 0, 0.3)")};
	z-index: 3;
	display: flex;
	justify-content: center;
	align-items: center;
	${({ isForm }) =>
		isForm &&
		css`
			.container {
				width: max-content;
				min-width: 320px;
				background: white;
				padding: 30px;
				border-radius: 4px;
				h2 {
					font-weight: 600;
					margin-bottom: 10px;
					font-size: 1.4rem;
				}
				p{
					font-size: 1.1rem;
					margin-bottom: 10px;
				}
				select {
					width: 100%;
					height: 30px;
				}
				}
				textarea {
					width: 600px;
					height: 300px;
					font-size: 1.1rem;
				}
			}
			.buttons {
				margin-top: 20px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		`}
`
const BodyStye = createGlobalStyle`
body{
	overflow-y: hidden;
}
`

export default function Modal({ children, bgColor, isForm }) {
	return ReactDOM.createPortal(
		<ModalContainer bgColor={bgColor} isForm={isForm}>
			<div className="container">
				<div className="content">{children}</div>
			</div>
			<BodyStye />
		</ModalContainer>,
		document.querySelector("#__next")
	)
}
