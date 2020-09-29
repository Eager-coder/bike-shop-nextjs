import { useContext } from "react"
import shortid from "shortid"
import styled from "styled-components"
import { UserContext } from "../Context"
const Form = styled.div`
	margin-top: 50px;
	label {
		display: block;
		margin: 20px 0;
		span {
			font-size: 1.2rem;
			font-weight: 600;
			margin-right: 10px;
		}
		select {
			width: 80px;
			height: 30px;
			font-size: 1.2rem;
		}
		input[type="number"] {
			width: 50px;
			font-size: 1.2rem;
			height: 30px;
		}
	}
	#add-to-cart {
		cursor: pointer;
		width: max-content;
		height: max-content;
		padding: 10px;
		background: black;
		border: 2px black solid;
		border-radius: 7px;
		color: white;
		transition: 0.3s;
		:hover {
			border: 2px black solid;
			background: white;
			color: black;
		}
	}
	@media (max-width: 768px) {
		margin-top: 20px;
	}
`

export default function SelectForm({ productData, size, setSize, qty, setQty }) {
	const { userData } = useContext(UserContext)
	const newItem = {
		id: shortid(),
		productId: Number(productData.id),
		name: productData.name,
		image: productData.image,
		price: Number(productData.price),
		size: Number(size),
		qty: Number(qty),
	}
	const addToCart = async () => {
		if (userData.isLoggedIn) {
			const res = await fetch("/api/user/cart", {
				method: "POST",
				body: JSON.stringify({ itemData: { userId: userData.id, ...newItem } }),
			})
			const json = await res.json()
			console.log(json)
		} else {
			const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
			const isSameIdAndSize = cartItems.some(
				item => item.productId === newItem.productId && item.size === newItem.size
			)
			if (isSameIdAndSize) {
				cartItems.forEach(item => {
					if (item.productId === newItem.productId && item.size === newItem.size) {
						item.qty += newItem.qty
						localStorage.setItem("cartItems", JSON.stringify(cartItems))
						return
					}
				})
			} else {
				cartItems.push(newItem)
				localStorage.setItem("cartItems", JSON.stringify(cartItems))
			}
		}
	}
	return (
		<Form>
			{productData.category === "bikes" ? (
				<label className="select-size">
					<span>Select a size:</span>
					<select name="size" value={size} onChange={e => setSize(e.target.value)}>
						<option value="48">48</option>
						<option value="50">50</option>
						<option value="52">52</option>
						<option value="54">54</option>
						<option value="56">56</option>
						<option value="58">58</option>
					</select>
				</label>
			) : (
				""
			)}
			<label className="select-qty">
				<span>Quantity:</span>
				<input type="number" min="1" max="50" value={qty} onChange={e => setQty(e.target.value)} />
			</label>
			<button onClick={addToCart} id="add-to-cart">
				Add to Cart
			</button>
		</Form>
	)
}
