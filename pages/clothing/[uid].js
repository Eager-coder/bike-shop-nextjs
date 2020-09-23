import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import { Category } from "../../components/Category/Filter"
import ItemGrid from "../../components/Category/ItemGrid"
import Banner from "../../components/Category/Banner"
import styled from "styled-components"

const Section = styled.section`
	display: flex;
	width: 100%;
	max-width: 1500px;
	margin: 50px auto;
	padding: 0 50px;
	aside {
		width: 200px;
		.filter-msg {
			margin: 20px 0;
			#reset {
				cursor: pointer;
				width: 20px;
				height: 20px;
				margin: 0 5px;
				border: none;
				border-radius: 50%;
				background: black;
				color: white;
				font-size: 0.8rem;
			}
		}
	}
	@media (max-width: 900px) {
		flex-direction: column;
		padding: 0 20px;
		aside {
			width: 100%;
		}
	}
`
export default function Clothing({ data }) {
	const initialList = JSON.parse(data)
	const [productList, setProductList] = useState(initialList)
	const [filterMsg, setFilterMsg] = useState(null)
	const router = useRouter()
	const heading = router.query.uid.charAt(0).toUpperCase() + router.query.uid.slice(1)
	const brands = [...new Set(initialList.map(e => e.brand))]
	const years = [...new Set(initialList.map(e => e.year))]
	const priceRange = [
		[0, 25],
		[25, 50],
		[50, 75],
		[75, 3000],
	]
	useEffect(() => setProductList(initialList), [data])
	const filterList = (category, value) => {
		setFilterMsg(`${category}: ${value}`)
		switch (category) {
			case "brand":
				setProductList(initialList.filter(e => e.brand === value))
				break
			case "year":
				setProductList(initialList.filter(e => e.year === value))
				break
			case "price":
				setProductList(initialList.filter(e => e.price >= value[0] && e.price <= value[1]))
		}
	}
	const resetFilter = () => {
		setProductList(initialList)
		setFilterMsg(null)
	}
	return (
		<Layout>
			<Banner heading={heading} />
			<Section>
				<aside>
					<h2>Filter by</h2>
					{filterMsg ? (
						<div className="filter-msg">
							<span>{filterMsg}</span>
							<button id="reset" onClick={resetFilter}>
								&#x2716;
							</button>
						</div>
					) : null}
					<Category name="Brand">
						{brands.map((e, index) => (
							<li key={index} onClick={() => filterList("brand", e)}>
								{e}
							</li>
						))}
					</Category>
					<Category name="Year">
						{years.map((e, index) => (
							<li key={index} onClick={() => filterList("year", e)}>
								{e}
							</li>
						))}
					</Category>
					<Category name="Price">
						{priceRange.map((e, index) => (
							<li key={index} onClick={() => filterList("price", e)}>{`$${e[0]} - $${e[1]}`}</li>
						))}
					</Category>
				</aside>
				<ItemGrid productList={productList} />
			</Section>
		</Layout>
	)
}
import dbExecute from "../api/db"
export async function getServerSideProps({ query }) {
	const data = await dbExecute(`SELECT * FROM products WHERE type = '${query.uid}'`)
	return {
		props: { data: JSON.stringify(data) },
	}
}
