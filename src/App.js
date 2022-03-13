import "./App.css";
import SearchBar from "./components/SearchBar";
import AddItem from "./components/AddItem";
import React, { useState, useEffect } from "react";
import ItemsDisplay from "./components/ItemsDisplay";

function App() {
	const [filters, setFilters] = useState({});
	const [data, setData] = useState({ items: [] });

	useEffect(() => {
		fetch("http://localhost:3000/items")
			.then((response) => response.json())
			.then((data) => setData({ items: data }));
	}, []);

	/* dependency list:
	1. [] = runs only once (on mount)
	2. [data] = runs when $content is modified
		e.g.: data, filters, other functions*/

	const updateFilters = (searchParams) => {
		setFilters(searchParams);
	};

	const deleteItem = (item) => {
		const items = data["items"];
		const requestSpecs = {
			method: "DELETE",
		};
		fetch(`http://localhost:3000/items/${item.id}`, requestSpecs).then(
			(response) => {
				if (response.ok) {
					const idx = items.indexOf(item);
					items.splice(idx, 1);
					setData({ items: items });
				};
			}
		);
	};

	const addItemToData = (item) => {
		let items = data["items"];

		const requestSpecs = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(item),
		};

		fetch("http://localhost:3000/items", requestSpecs)
			.then((response) => response.json())
			.then((data) => {
				items.push(data);
				setData({ items: items });
			});
	};

	const filterData = (data) => {
		const filteredData = [];

		if (!filters.name) {
			return data;
		}

		for (const item of data) {
			if (filters.name !== "" && item.name !== filters.name) {
				continue;
			}

			if (filters.price !== 0 && item.price > filters.price) {
				continue;
			}

			if (filters.type !== "" && item.type !== filters.type) {
				continue;
			}

			if (filters.brand !== "" && item.brand !== filters.brand) {
				continue;
			}

			filteredData.push(item);
		}

		return filteredData;
	};

	return (
		<div className="container">
			<div className="row mt-3">
				<ItemsDisplay deleteItem={deleteItem} items={filterData(data["items"])} />
			</div>
			<div className="row mt-3">
				<SearchBar updateSearchParams={updateFilters} />
			</div>
			<div className="row mt-3">
				<AddItem addItem={addItemToData} />
			</div>
		</div>
	);
}

export default App;
