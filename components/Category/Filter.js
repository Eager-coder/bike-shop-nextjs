import styled from "styled-components"
import React, { useState, useEffect } from "react"
const Li = styled.li`
	header {
		cursor: pointer;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 10px 0px;
		border-top: 1px black solid;
	}
	img {
		transition: 0.3s;
		height: 15px;
		margin-right: 8px;
		transform: rotate(${props => (props.isOpen ? "180deg" : "0deg")});
	}
	.list {
		transition: 0.3s;
		max-height: ${props => (props.isOpen ? "150px" : "0px")};
		overflow: hidden;
		padding: 0 10px;
		li {
			padding: 3px 0;
			cursor: pointer;
		}
	}
	@media (max-width: 1000px) {
		.list li {
			font-size: 0.9rem;
		}
	}
`
export function Category({ children, name }) {
	const array = React.Children.toArray(children)
	const [isOpen, setOpen] = useState(false)
	return (
		<div>
			<Li isOpen={isOpen}>
				<header onClick={() => setOpen(!isOpen)}>
					<span>{name}</span>
					<img src="/icons/chevron-down.svg" alt="" />
				</header>
				<ul className="list">{array.map((item, index) => item)}</ul>
			</Li>
		</div>
	)
}
