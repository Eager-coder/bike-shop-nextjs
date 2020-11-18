// importing all the components
import Layout from "../components/Layout"
import Hero from "../components/Home/Hero"
import Products from "../components/Home/Products"
export default function Home() {
	return (
		// Layout of the website
		<Layout>
			{/* Hero and Products sections */}
			<>
				<Hero />
				<Products />
			</>
		</Layout>
	)
}
