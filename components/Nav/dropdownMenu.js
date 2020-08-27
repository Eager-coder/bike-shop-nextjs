import Link from "next/link"
import styled from "styled-components"
const Li = styled.li`
	display: block;
	padding: 1.5rem 25px;
	color: white;
	& > a {
		color: white;
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
		width: auto;
		height: max-content;
		justify-content: space-between;
		z-index: 1;
		transition: 0.2s;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
	return (
		<Li>
			<Link href={`/${category}`} as={`/${category}`} passHref>
				<a>{category.charAt(0).toUpperCase() + category.slice(1)}</a>
			</Link>
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
