import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import ImgView from "../../components/Category/ImgView"
import SelectForm from "../../components/Category/SelectForm"
import SpecsTable from "../../components/Category/SpecsTable"
import styled from "styled-components"
import db_info from "../../db_info"
import mysql from "mysql"
const Top = styled.section`
	margin: auto;
	display: flex;
	width: 100%;
	max-width: 1200px;
	padding: 50px 20px;
	.right {
		width: 45%;
	}
	@media (max-width: 768px) {
		flex-direction: column;
		padding: 20px;
		.right {
			width: 100%;
		}
	}
`
const Text = styled.div`
	h1 {
		font-size: 2rem;
	}
	.price {
		font-size: 2rem;
		margin-bottom: 20px;
	}
	.desc {
		font-size: 1rem;
	}
	@media (max-width: 768px) {
		h1,
		.price {
			font-size: 1.5rem;
		}
		.desc {
			font-size: 0.9rem;
		}
	}
`
export default function Bikes({ product }) {
	const data = JSON.parse(product)
	const table = data.tech_specs
		.replace(/[\r\n\t]/g, "")
		.split("#")
		.filter(e => e.length)
		.map(e => {
			return e.split("=")
		})
	const [size, setSize] = useState(48)
	const [qty, setQty] = useState(1)
	return (
		<Layout>
			<Top>
				<ImgView image={data.image} />
				<div className="right">
					<Text>
						<h1>{data.name}</h1>
						<p className="price">
							<strong>${data.price}</strong>
						</p>
						<p className="desc">{data.description}</p>
					</Text>
					<SelectForm productData={data} size={size} setSize={setSize} qty={qty} setQty={setQty} />
				</div>
			</Top>
			<SpecsTable tech_specs={table} />
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const bike_name = context.query.uid
	// console.log(bike_name)
	const data = new Promise((res, rej) => {
		const db = mysql.createConnection(db_info)
		db.connect()
		db.query(`SELECT * FROM products WHERE name = '${bike_name}'`, (error, results, fields) => {
			if (error) console.log(error)
			res(results)
		})
		db.end()
	})
	const product = await data
	return {
		props: { product: JSON.stringify(product[0]) },
	}
}
