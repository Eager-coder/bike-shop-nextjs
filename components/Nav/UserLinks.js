import Link from 'next/link'
import styled from 'styled-components'
const Div = styled.div`
	display: flex;
	> div {
		width: max-content;
		background-color: white;
		height: 2rem;
		display: flex;
		align-items: center;
		border-radius: 4px;
		margin-right: 15px;
		img {
			width: auto;
			height: 20px;
			padding: 0 7px;
		}
		input {
			width: 200px;
			border: none;
			font-size: 1rem;
			@media (max-width: 768px) {
				width: 150px;
			}
		}
	}
	.cart {
		img {
			width: 30px;
			filter: invert(0);
		}
	}
	.user {
		margin: 0 15px;
		img {
			width: 30px;
			filter: invert(1);
		}
	}
`
export default function UserLinks({ isSearchOpen, setSearchOpen }) {
	return (
		<Div>
			<div datatype='search-field'>
				<img
					onClick={() => setSearchOpen(!isSearchOpen)}
					src='https://img.icons8.com/ios-glyphs/96/000000/search.png'
				/>
				<input type='text' placeholder='Search...' />
			</div>
			<Link href='/cart' passHref>
				<a className='cart'>
					<img src='https://img.icons8.com/cotton/96/000000/shopping-cart--v2.png' />
				</a>
			</Link>
			<Link href='/cart' passHref>
				<a className='user'>
					<img src='https://img.icons8.com/small/96/000000/user.png' />
				</a>
			</Link>
		</Div>
	)
}
