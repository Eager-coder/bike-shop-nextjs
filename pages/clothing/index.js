import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"
const Title = styled.h1`
	text-align: center;
	font-size: 4rem;
	@media (max-width: 480px) {
		font-size: 3rem;
	}
`
const Section = styled.section`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	width: 100%;
	max-width: 1100px;
	padding: 0 20px;
	margin: 50px auto;
	row-gap: 40px;
	column-gap: 70px;
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`
const Category = styled.a`
	cursor: pointer;
	position: relative;
	width: 100%;
	height: 200px;
	overflow: hidden;
	::after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.4);
	}
	:hover img {
		transform: scale(1.05);
	}
	img {
		transition: 0.4s;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	h2 {
		z-index: 1;
		position: absolute;
		transform: translate(-50%, -50%);
		top: 50%;
		left: 50%;
		color: white;
		font-size: 3rem;
		@media (max-width: 480px) {
			font-size: 2rem;
		}
	}
`
export default function Bikes({ product }) {
	const router = useRouter()
	return (
		<Layout>
			<Title>Clothing</Title>
			<Section>
				<Link href="/clothing/[uid]" as="/clothing/helmets">
					<Category>
						<img src="" alt="" />
						<h2>Helmets</h2>
					</Category>
				</Link>
				<Link href="/clothing/[uid]" as="/clothing/jerseys">
					<Category>
						<img src="" alt="" />
						<h2>Jerseys</h2>
					</Category>
				</Link>
				<Link href="/clothing/[uid]" as="/clothing/gloves">
					<Category>
						<img src="" alt="" />
						<h2>Gloves</h2>
					</Category>
				</Link>
			</Section>
		</Layout>
	)
}
