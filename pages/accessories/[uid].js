import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import Filter from "../../components/Category/Filter"
import Item from "../../components/Category/Item"
import styled from "styled-components"
import mysql from "mysql"
import db_info from "../../db_info"

const Title = styled.div`
	width: 100%;
	height: 350px;
	/* background: url(/images/bikes.jpg) no-repeat; */
	background-size: cover;
	background-position: 0 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	&::after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgb(0, 0, 0, 0.2);
	}
	h1 {
		color: white;
		font-size: 4.5rem;
		z-index: 1;
	}
`
const Section = styled.section`
	display: flex;
	width: 100%;
	max-width: 1500px;
	margin: 50px auto;
	padding: 0 50px;
`
const ItemGrid = styled.section`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 20px;
	row-gap: 20px;
	width: 100%;
	padding: 0 50px;
`
export default function Bikes({ product }) {
	const bikes = JSON.parse(product)
	const router = useRouter()
	const heading = router.query.uid.charAt(0).toUpperCase() + router.query.uid.slice(1)

	const category = [
		{
			name: "Brand",
			list: ["Trek", "Giant", "Cannondale", "Bianchi"],
		},
		{
			name: "Model Year",
			list: ["2018", "2019", "2020"],
		},
		{
			name: "Price",
			list: ["Ascenidng", "Descending"],
		},
		{
			name: "Price range",
			list: ["0-50.000", "50.000-100.000", "100.000-250.000", "250.000-1.500.000"],
		},
	]
	return (
		<Layout>
			<Title>
				<h1>{heading}</h1>
			</Title>
			<Section>
				<Filter category={category} />
				<ItemGrid>
					{bikes.length ? bikes.map((e, index) => <Item key={index} data={e} />) : ""}
				</ItemGrid>
			</Section>
		</Layout>
	)
}

export async function getServerSideProps({ query }) {
	const data = new Promise((res, rej) => {
		const db = mysql.createConnection(db_info)
		db.connect()
		db.query(`SELECT * FROM products WHERE type = '${query.uid}'`, (error, results, fields) => {
			if (error) {
				rej(error)
				console.log(error)
			} else {
				res(results)
			}
		})
		db.end()
	})
	const product = await data
	return {
		props: { product: JSON.stringify(product) },
	}
}
