import { useState, useEffect } from "react"
import Item from "./Item"
export default function AllProducts({ isProductsLoaded, setProductsLoaded }) {
	const [products, setProducts] = useState([])
	const getProducts = async () => {
		const res = await fetch("/api/admin/products")
		const data = await res.json()
		setProducts(data)
	}
	useEffect(() => {
		if (isProductsLoaded) {
			getProducts()
		}
	}, [isProductsLoaded])

	return (
		<div>
			<h2>All Products</h2>
			{products.length ? products.map((e, index) => <Item key={index} product={e} />) : ""}
		</div>
	)
}
