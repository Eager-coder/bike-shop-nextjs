import { useState, useEffect } from "react"
import Link from "next/link"
import styled from "styled-components"
const SideNav = styled.aside`
	width: 300px;
	.username {
		span {
			text-transform: uppercase;
			font-size: 1.2rem;
			font-weight: 600;
		}
	}
	.links {
		margin-left: 20px;
		li {
			width: 100%;
			a {
				display: block;
				width: 100%;
				margin: 10px 0;
				text-transform: uppercase;
				font-size: 1.5rem;
			}
		}
	}
	.link-active {
		a {
			border-left: blue 4px solid;
			padding-left: 40px;
		}
	}
`
export default function Sidebar({ name, link }) {
	return (
		<SideNav>
			<div className="username">
				<span>Welcome, {name}!</span>
			</div>
			<ul className="links">
				<li className={link === "profile" ? "link-active" : "link"}>
					<Link href="/myaccount/[uid]" as="/myaccount/profile">
						<a>Profile</a>
					</Link>
				</li>
				<li className={link === "orders" ? "link-active" : "link"}>
					<Link href="/myaccount/[uid]" as="/myaccount/orders">
						<a>Orders</a>
					</Link>
				</li>
			</ul>
		</SideNav>
	)
}
