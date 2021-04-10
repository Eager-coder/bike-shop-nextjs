import styled from "styled-components"

const BtnPrimaryStyle = styled.button`
	width: ${({ width }) => (width ? width : "max-content")};
	height: max-content;
	border-radius: 4px;
	border: black 2px solid;
	color: white;
	font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.1rem")};
	font-weight: 500;
	background-color: black;
	cursor: pointer;
	padding: 5px 10px;
	&:disabled {
		background-color: grey;
		border: grey 2px solid;
		opacity: 0.6;
	}
`
export const BtnPrimary = ({ width, fontSize, onClick, label, disabled }) => {
	return (
		<BtnPrimaryStyle
			type="submit"
			width={width}
			fontSize={fontSize}
			onClick={onClick}
			disabled={disabled}>
			{label}
		</BtnPrimaryStyle>
	)
}
const BtnSecondaryStyle = styled.button`
	width: ${({ width }) => (width ? width : "max-content")};
	height: max-content;
	border-radius: 4px;
	border: black 2px solid;
	color: black;
	font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.1rem")};
	font-weight: 500;
	background-color: white;
	cursor: pointer;
	padding: ${({ padding }) => (padding ? padding : "5px 10px")};
	margin: ${({ margin }) => (margin ? margin : "0")};
	&:disabled {
		background-color: grey;
		border: grey 2px solid;
		opacity: 0.6;
	}
`
export const BtnSecondary = ({ fontSize, padding, margin, onClick, label, disabled }) => {
	return (
		<BtnSecondaryStyle
			padding={padding}
			margin={margin}
			fontSize={fontSize}
			onClick={onClick}
			disabled={disabled}>
			{label}
		</BtnSecondaryStyle>
	)
}

const BtnDangerStyle = styled.button`
	width: ${({ width }) => (width ? width : "max-content")};
	height: max-content;
	border-radius: 4px;
	border: #ff0707 2px solid;
	color: #cc0000;
	font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.1rem")};
	font-weight: 500;
	background-color: white;
	cursor: pointer;
	padding: 5px 10px;
	&:disabled {
		opacity: 0.6;
	}
`
export const BtnDanger = ({ width, fontSize, style, onClick, label, disabled }) => {
	return (
		<BtnDangerStyle
			style={style}
			width={width}
			fontSize={fontSize}
			onClick={onClick}
			disabled={disabled}>
			{label}
		</BtnDangerStyle>
	)
}
