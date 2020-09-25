import styled from "styled-components"
import Item from "./Item"
import Loading from "../Loading"

const ProductsSection = styled.section`
	width: 100%;
`
export default function AllProducts({ products }) {
	// const [products, setProducts] = useState(null)
	// useEffect(() => {
	// 	const getProducts = async () => {
	// 		const res = await fetch("/api/admin/products")
	// 		const data = await res.json()
	// 		setProducts(data)
	// 	}
	// 	getProducts()
	// }, [])
	return (
		<ProductsSection>
			<h2>All Products</h2>
			{products ? products.map((e, index) => <Item key={index} product={e} />) : <Loading />}
		</ProductsSection>
	)
}
