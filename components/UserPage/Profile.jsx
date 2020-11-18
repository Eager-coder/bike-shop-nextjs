import { useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
import EditProfile from "../UserPage/EditProfile"
const ProfileSection = styled.section`
	h1 {
		font-size: 2.2rem;
		text-transform: uppercase;
		font-weight: 500;
		margin-bottom: 40px;
	}
	width: 100%;
	.box {
		width: 100%;
		border-radius: 4px;
		box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
		margin: 10px 0;
		padding: 30px 25px;
		* {
			color: rgb(25, 25, 25);
		}
		h2 {
			font-size: 1.1rem;
			font-weight: 600;
		}
		.edit-btn {
			cursor: pointer;
		}
		b {
			font-weight: 600;
		}
		.box-heading {
			display: flex;
			justify-content: space-between;
		}
		.property {
			display: flex;
			flex-direction: column;
			margin: 10px 0;
		}
		hr {
			border: none;
			height: 1.5px;
			background: rgba(0, 0, 0, 0.3);
			margin: 15px 0;
		}
	}
	@media (max-width: 768px) {
		h1 {
			font-size: 1.7rem;
		}
	}
`
const GlobalStyle = createGlobalStyle`
  body {
    overflow: ${({ isOpen }) => (isOpen ? "hidden" : "visible")}} 
`
export default function Profile({ user }) {
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [type, setType] = useState(null)
	return (
		<ProfileSection>
			{isEditOpen ? <EditProfile type={type} user={user} setIsEditOpen={setIsEditOpen} /> : null}
			<h1>Profile</h1>
			<div className="name-email-box box">
				<div className="box-heading">
					<h2>PROFILE INFORMATION</h2>
					<span
						className="edit-btn"
						onClick={() => {
							setIsEditOpen(true)
							setType("profile")
						}}>
						Edit
					</span>
				</div>
				<hr />
				<div className="name property">
					<b>Name</b>
					<span>{user.name}</span>
				</div>
				<div className="surname property">
					<b>Surame</b>
					<span>{user.surname}</span>
				</div>
				<div className="email property">
					<b>Email</b>
					<span>{user.email}</span>
				</div>
			</div>
			<div className="password-box box">
				<div className="box-heading">
					<h2>PASSWORD</h2>
					<span
						className="edit-btn"
						onClick={() => {
							setIsEditOpen(true)
							setType("password")
						}}>
						Change Password
					</span>
				</div>
				<hr />
			</div>
			<GlobalStyle isOpen={isEditOpen} />
		</ProfileSection>
	)
}
