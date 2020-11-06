import Layout from "../components/Layout"
import Hero from "../components/Home/Hero"
import Products from "../components/Home/Products"
export default function Home() {
	return (
		<Layout>
			<>
				<Hero />
				<Products />
			</>
		</Layout>
	)
}
