import Layout from "../../components/Layout"
import ImgView from "../../components/Category/ImgView"
import SelectForm from "../../components/Category/SelectForm"
import SpecsTable from "../../components/Category/SpecsTable"
import styled from "styled-components"
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
	console.log("product size", JSON.parse(product).size)
	const data = JSON.parse(product)
	const table = data.tech_specs
		.replace(/[\r\n\t]/g, "")
		.split("#")
		.filter(e => e.length)
		.map(e => {
			return e.split("=")
		})

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
					<SelectForm productData={data} />
				</div>
			</Top>
			<SpecsTable tech_specs={table} />
		</Layout>
	)
}

const db = require("../api/db")
export async function getServerSideProps(context) {
	const product_name = context.query.uid
	const [data] = await db.query(`SELECT * FROM products WHERE name = '${product_name}'`)
	return {
		props: { product: JSON.stringify(data) },
	}
}
