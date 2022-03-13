import { useState } from "react";

function AddItem(props) {
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [type, setType] = useState("");
	const [brand, setBrand] = useState("");

	const addItemButtonPressed = () => {
		props.addItem({
			name: name,
			price: price,
			type: type,
			brand: brand,
		});
		setName("");
		setPrice(0);
		setType("");
		setBrand("");
	};

	return (
		<div className="container">
			<div className="row">
				<h2>Add a item: </h2>
			</div>
			<div className="row">
				<label htmlFor="name-field">Name: </label>
				<input
					id="name-field"
					type="text"
					value={name}
					className="form-control"
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="price-field">Price: </label>
				<input
					id="price-field"
					type="number"
					value={price}
					className="form-control"
					onChange={(e) => setPrice(e.target.value)}
				/>
				<label htmlFor="type-field">Type: </label>
				<input
					id="type-field"
					type="text"
					value={type}
					className="form-control"
					onChange={(e) => setType(e.target.value)}
				/>
				<label htmlFor="brand-field">Brand: </label>
				<input
					id="brand-field"
					type="text"
					value={brand}
					className="form-control"
					onChange={(e) => setBrand(e.target.value)}
				/>
			</div>
			<div className="row">
				<button type="button" className='btn btn-primary mt-3' onClick={addItemButtonPressed}>
					Add Item
				</button>
			</div>
		</div>
	);
}

export default AddItem;
