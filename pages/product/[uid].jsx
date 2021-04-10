import Layout from "../../components/Layout"
import ImgView from "../../components/Category/ImgView"
import SelectForm from "../../components/Category/SelectForm"
import SpecsTable from "../../components/Category/SpecsTable"
import styled from "styled-components"
import Head from "next/head"
import { useRouter } from "next/router"
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
export default function Bikes({ product, error }) {
	const router = useRouter()
	if (router.isFallback) {
		return <div>Loading...</div>
	}
	if (error) return <>Error</>
	const data = JSON.parse(product)
	const table = data.tech_specs
		.replace(/[\r\n\t]/g, "")
		.split("#")
		.filter(e => e.length)
		.map(e => e.split("="))
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

const db = require("../../utils/db")

// This function gets called at build time on server-side.
// It may be called again, if new request comes in
export async function getStaticProps({ params }) {
	const [product] = await db.query(`SELECT * FROM products WHERE name = ? AND is_deleted = 0`, [
		params.uid,
	])
	if (!product)
		return {
			props: {
				products: null,
				error: true,
			},
		}

	return {
		props: { product: JSON.stringify(product), error: false },
		revalidate: 1,
	}
}
// This function define a list of paths that
// have to be rendered to HTML at build time.
export const getStaticPaths = async () => {
	const products = await db.query(`SELECT * FROM products`)
	const paths = products.map(item => ({
		params: {
			uid: encodeURIComponent(item.name).toString(),
		},
	}))
	return {
		fallback: true,
		paths,
	}
}
