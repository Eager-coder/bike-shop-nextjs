import Layout from "../components/Layout"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Loading from "../components/Loading"
import ItemGrid from "../components/Category/ItemGrid"
import Head from "next/head"
const Container = styled.section`
	max-width: 1300px;
	padding: 0 20px;
	margin: 100px auto;
	h1 {
		font-size: 2rem;
	}
`
export default function Search() {
	const [result, setResult] = useState({ isLoading: false, data: [] })
	const router = useRouter()
	const word = router?.query?.word
	const searchItem = async () => {
		setResult({ ...result, isLoading: true })
		const res = await fetch(`/api/search?word=${word}`)
		const json = await res.json()
		setResult({ data: json.searchResult, isLoading: false })
		console.log(json)
	}
	useEffect(() => {
		if (word && word.length) searchItem()
	}, [router])
	return (
		<Layout>
			<Head>
				<title>Search Results | Focus - Online Bike Shop</title>
			</Head>
			<Container>
				{result.isLoading ? (
					<Loading size={150} />
				) : result.data.length ? (
					<>
						<h1>You searched for: "{word}"</h1>
						<ItemGrid productList={result.data} />
					</>
				) : (
					<>
						<h1>No results found </h1>
						<h2>Sorry, we couldn't find any results for your search</h2>
					</>
				)}
			</Container>
		</Layout>
	)
}
