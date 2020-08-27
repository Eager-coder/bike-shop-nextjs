import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import styled from "styled-components"
import Link from "next/link"
const Title = styled.h1`
	text-align: center;
	font-size: 4rem;
	@media (max-width: 480px) {
		font-size: 3rem;
	}
`
const Section = styled.section`
	display: grid;
	grid-template-columns: 1fr 1fr;
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
	return (
		<Layout>
			<Title>Bikes</Title>
			<Section>
				<Link href="/bikes/[uid]" as="/bikes/road">
					<Category>
						<img
							src="https://images.unsplash.com/photo-1516725630185-19ae408fbc83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
							alt=""
						/>
						<h2>Road</h2>
					</Category>
				</Link>
				<Link href="/bikes/[uid]" as="/bikes/mountain">
					<Category>
						<img
							src="https://specials-images.forbesimg.com/imageserve/5ed67af53ffc140007dfaec0/960x0.jpg?fit=scale"
							alt=""
						/>
						<h2>Mountain</h2>
					</Category>
				</Link>
				<Link href="/bikes/[uid]" as="/bikes/bmx">
					<Category>
						<img
							src="https://www.monsterenergy.com/media/uploads_image/2019/06/10/1600/800/f4a46832e2f64a0a267dd315bd44d94f.jpg?mod=v1_8fb21560b3894a49435c48d139bb96e0"
							alt=""
						/>
						<h2>BMX</h2>
					</Category>
				</Link>
				<Link href="/bikes/[uid]" as="/bikes/city">
					<Category>
						<img
							src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/12/Woman-Riding-Rented-Bicycle-In-A-City.-Cycling-and-smiling-1296x728-header-1296x728.jpg?w=1155&h=1528"
							alt=""
						/>
						<h2>City</h2>
					</Category>
				</Link>
			</Section>
		</Layout>
	)
}
