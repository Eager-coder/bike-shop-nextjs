import styled from "styled-components"
import ClipLoader from "react-spinners/ClipLoader"
const Loader = styled.div`
	height: 50vh;
	display: flex;
	justify-content: center;
	align-items: center;
`
export default function Loading({ size }) {
	return (
		<Loader>
			<ClipLoader color={"#1a1a1a"} size={size + "px"} />
		</Loader>
	)
}
