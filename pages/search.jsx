import Layout from "../components/Layout"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Loading from "../components/Loading"
export default function Search() {
	const router = useRouter()
	const word = router?.query?.word
	const searchItem = async () => {
		const res = await fetch(`/api/search?word=${word}`)
		const json = await res.json()
		console.log(json)
	}
	useEffect(() => {
		if (word && word.length) searchItem()
	}, [router])
	return (
		<Layout>
			<h1>Search results</h1>
		</Layout>
	)
}
