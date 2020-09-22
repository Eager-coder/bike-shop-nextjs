import { useState, useEffect } from "react"
import styled from "styled-components"
const MessageContainer = styled.div`
	max-width: 100%;
	height: 50px;
	margin: 10px 0;
	border: ${({ status }) => (status ? "green" : "red")} 2px solid;
	border-radius: 4px;
	background-color: ${({ status }) => (status ? "#e7f9f1" : "#faeded")};
	color: ${({ status }) => (status ? "green" : "red")};
	font-size: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
`
export default function Message({ message, isSuccess }) {
	return message ? <MessageContainer status={isSuccess}>{message}</MessageContainer> : null
}
