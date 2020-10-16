import styled from "styled-components"
import { useState, useContext } from "react"
import { useRouter } from "next/router"
import Context from "../Context"
const EditBox = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.3);
	z-index: 3;
	display: flex;
	justify-content: center;
	align-items: center;
	form {
		max-width: 600px;
		height: max-content;
		padding: 50px;
		background: white;
		border-radius: 4px;
		.type {
			font-size: 1.5rem;
			font-weight: 500;
		}
		label {
			display: flex;
			flex-direction: column;
			margin: 15px 0;
			input {
				border-radius: 4px;
				border: 1px solid rgba(0, 0, 0, 0.3);
				width: 100%;
				height: 40px;
				font-size: 1rem;
				padding: 0 10px;
			}
		}
		.buttons {
			display: flex;
			justify-content: space-between;
			button {
				cursor: pointer;
				padding: 5px 10px;
				background: black;
				border: none;
				border-radius: 4px;
				color: white;
			}
			#cancel {
				cursor: pointer;
			}
		}
	}
`

export default function EditProfile({ user, type, setIsEditOpen }) {
	const [newProfile, setProfile] = useState({ ...user, newEmail: user.email })
	const [newPassword, setPasswords] = useState({ email: user.email })
	const [message, setMessage] = useState(null)
	const router = useRouter()
	const { setUserData } = useContext(Context)
	const handleEdit = e => {
		if (type === "password") {
			setPasswords({ ...newPassword, [e.target.name]: e.target.value })
		} else {
			setProfile({ ...newProfile, [e.target.name]: e.target.value })
		}
	}
	const handleSubmit = async e => {
		e.preventDefault()
		const res = await fetch("/api/user/updateUser", {
			body: JSON.stringify({ data: type === "profile" ? newProfile : newPassword, type }),
			method: "POST",
		})
		const json = await res.json()
		if (json.isSuccess) {
			const res = await fetch("/api/user/logout")
			const json = await res.json()
			setUserData(json)
			router.push("/login")
		} else {
			setMessage(json.message)
		}
	}
	return (
		<EditBox>
			<form onSubmit={handleSubmit}>
				{type === "profile" ? (
					<>
						<div className="type">Edit Profile</div>
						<label>
							<span>Name</span>
							<input
								type="text"
								name="name"
								defaultValue={user.name}
								required
								onChange={handleEdit}
							/>
						</label>
						<label>
							<span>Surname</span>
							<input
								type="text"
								name="surname"
								defaultValue={user.surname}
								required
								onChange={handleEdit}
							/>
						</label>
						<label>
							<span>Email</span>
							<input
								type="text"
								name="newEmail"
								defaultValue={user.email}
								required
								onChange={handleEdit}
							/>
						</label>
					</>
				) : (
					<>
						<div className="type">Change Password</div>
						<label>
							<span>Old Password</span>
							<input
								type="password"
								name="oldPassword"
								placeholder="Old Password"
								required
								onChange={handleEdit}
							/>
						</label>
						<label>
							<span>New Password</span>
							<input
								type="password"
								name="newPassword"
								placeholder="New Password"
								required
								onChange={handleEdit}
							/>
						</label>
						<label>
							<span>Confirm Password</span>
							<input
								type="password"
								name="confirmPassword"
								placeholder="Confirm Password"
								required
								onChange={handleEdit}
							/>
						</label>
					</>
				)}
				<div className="message">{message}</div>
				<div className="buttons">
					<button type="submit">Confirm</button>
					<span id="cancel" onClick={() => setIsEditOpen(false)}>
						Calcel
					</span>
				</div>
			</form>
		</EditBox>
	)
}
