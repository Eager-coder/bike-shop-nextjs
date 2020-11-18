// importing all the components
import Layout from "../components/Layout"
import Hero from "../components/Home/Hero"
import Products from "../components/Home/Products"
import Head from "next/head"
export default function Home() {
	return (
		// Layout of the website
		<Layout>
			<Head>
				<title>Focus | Online Bike Shop</title>
			</Head>
			<>
				{/* Hero and Products sections */}
				<Hero />
				<Products />
			</>
		</Layout>
	)
}
