import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import styled from "styled-components"
const Li = styled.li`
	display: block;
	.category {
		color: whitesmoke;
		font-weight: 500;
		font-size: 1.1rem;
		height: 4rem;
		padding: 0 20px;
		display: flex;
		align-items: center;
		@media (max-width: 1024px) {
			padding: 0 15px;
		}
	}
	:hover .category {
		border-top: solid 4px #ff4834;
		color: #ff4834;
	}
	&:hover ul {
		display: block;
	}

	@media (max-width: 768px) {
		padding: 1rem 20px;
	}
	ul {
		display: none;
		background-color: white;
		position: absolute;
		top: 4rem;
		padding: 0 20px;
		width: ${({ width }) => width}px;
		height: max-content;
		justify-content: space-between;
		z-index: 1;
		transition: 0.2s;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
		@media (max-width: 768px) {
			& {
				display: block;
				position: static;
				background: black;
				width: 100%;
			}
		}
		li {
			margin: 10px 0;
			a {
				color: black;
				:hover {
					color: #ff4834;
				}
			}
			@media (max-width: 768px) {
				& a {
					display: block;
					color: white;
					border-bottom: white 2px solid;
				}
			}
		}
	}
`

export default function DropdownMenu({ category, links }) {
	const categoryName = category === "bikes" ? "bicycles" : category
	const dropdownBox = useRef(null)
	const [width, setWidth] = useState(0)
	useEffect(() => {
		if (dropdownBox.current) {
			setWidth(dropdownBox.current.offsetWidth)
		}
	}, [])

	return (
		<Li ref={dropdownBox} width={width}>
			{/* <Link href={`/${category}`} as={`/${category}`}> */}
			<span className="category">
				{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
			</span>
			{/* </Link> */}
			<div>
				<ul>
					{links.map((e, index) => (
						<li key={index}>
							<Link href={`/${category}/[uid]`} as={`/${category}/${e}`}>
								<a>{e.charAt(0).toUpperCase() + e.slice(1)}</a>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</Li>
	)
}
