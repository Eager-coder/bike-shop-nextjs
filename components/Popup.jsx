import styled from "styled-components"
const Window = styled.div`
	background: rgba(255, 255, 255, 0.95);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`
export default function Popup({ children }) {
	return <Window>{children}</Window>
}
