import Layout from "../../components/Layout"
import ImgView from "../../components/Category/ImgView"
import SelectForm from "../../components/Category/SelectForm"
import SpecsTable from "../../components/Category/SpecsTable"
import styled from "styled-components"
import Head from "next/head"
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
	console.log(table)
	return (
		<Layout>
			<Head>
				<title>{data.name} | Focus - Online Bike Shop</title>
			</Head>
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
					<SelectForm productData={data} />
				</div>
			</Top>
			<SpecsTable tech_specs={table} />
		</Layout>
	)
}

const db = require("../../db")
export async function getStaticProps({ params }) {
	const [product] = await db.query(`SELECT * FROM products WHERE name = '${params.uid}'`)
	console.log(product)
	return {
		props: { product: JSON.stringify(product) },
		revalidate: 1,
	}
}

export const getStaticPaths = async () => {
	const products = await db.query(`SELECT * FROM products`)
	const paths = products.map(item => ({
		params: {
			uid: encodeURIComponent(item.name).toString(),
		},
	}))
	// console.log(paths)
	return {
		fallback: true,
		paths,
	}
}

// const db = require("../../db")
// export async function getServerSideProps(context) {
// 	const product_name = context.query.uid
// 	const [data] = await db.query(
// 		`SELECT * FROM products WHERE name = '${product_name}'`
// 	)
// 	return {
// 		props: { product: JSON.stringify(data) },
// 	}
// }
