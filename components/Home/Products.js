import Link from 'next/link'
import ProductBig from './ProductBig'
import ProductSmall from './ProductSmall'
import styled from 'styled-components'
const ProductsGrid = styled.section`
	width: 100%;
	max-width: 1400px;
	padding: 0 40px;
	margin: 50px auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 300px 300px;
	grid-template-areas:
		'left top'
		'left bottom';
	column-gap: 30px;
	row-gap: 30px;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`

export default function Products() {
	return (
		<ProductsGrid className='products-grid'>
			<ProductBig />
			<ProductSmall area='top' className='product-top'>
				<img src='/images/gloves.jpg' alt='' />
				<div className='textbox'>
					<h2>The new collection of protective gloves</h2>
					<Link href='/'>
						<a>See gloves</a>
					</Link>
				</div>
			</ProductSmall>
			<ProductSmall area='bottom' className='product-bottom'>
				<img src='/images/helmet.jpg' alt='' />
				<div className='textbox'>
					<h2>Bike helmets on sale</h2>
					<Link href='/'>
						<a>Shop </a>
					</Link>
				</div>
			</ProductSmall>
		</ProductsGrid>
	)
}
