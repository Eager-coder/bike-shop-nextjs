import Link from 'next/link'
import styled from 'styled-components'
const Header = styled.header`
	width: 100%;
	height: 4rem;
	background: black;
	position: fixed;
	nav {
		height: 100%;
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.logo {
			img {
				width: 80px;
			}
		}
		.user-links {
			button.logout {
				background: white;
				width: 60px;
				height: 30px;
				border-radius: 7px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
`
export default function TopNav() {
	return (
		<Header>
			<nav>
				<Link href='/' passHref>
					<a className='logo'>
						<img
							src='https://pluspng.com/img-png/puma-logo-png-white-puma-2-icon-512.png'
							alt=''
						/>
					</a>
				</Link>
				<div className='user-links'>
					<button className='logout'>Log out</button>
				</div>
			</nav>
		</Header>
	)
}
