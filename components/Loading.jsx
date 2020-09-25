import styled from "styled-components"
import ClipLoader from "react-spinners/ClipLoader"
const Loader = styled.div`
	/* position: fixed; */
	/* top: 0; */
	/* bottom: 0; */
	/* right: 0; */
	/* left: 0; */
	/* width: 100%; */
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
`
export default function Loading() {
	return (
		<Loader>
			<ClipLoader color={"#1a1a1a"} size="150" />
		</Loader>
	)
}
