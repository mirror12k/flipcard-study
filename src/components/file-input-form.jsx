import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";



const ThemeSwitch = (props) => {
	const [url, seturl] = useState('example_cards/test.txt');
	// const [loading, setloading] = useState(false);

	const available_urls = [
		['', 'None'],
		['example_cards/test.txt', 'Example Cards'],
	];

	const doloadbyurl = () => {
		console.log("fetching:", url);
		props.setloading(true);
		fetch(url).then(r => r.text()).then(props.onload);
	};

	const readFileAsync = file => new Promise((resolve, reject) => {
		let reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = reject;
		reader.readAsText(file);
	});

	const dragHover = e => {
		e.stopPropagation();
		e.preventDefault();

		if (e.type === 'dragover') {
			e.target.className = 'drop-area over';
		} else {
			e.target.className = 'drop-area';
		}
	}

	const onDrop = e => {
		e.stopPropagation();
		e.preventDefault();
		props.setloading(true);
		Promise.all([...e.dataTransfer.files].map(file => readFileAsync(file))).then(data => {
			props.setloading(false);
			// console.log('data:', data);
			props.onload(data[0]);
		});
	}

	return <div>
		<div className="drop-area"
					onDrop={onDrop}
					onDragOver={dragHover}
					onDragLeave={dragHover}></div>

		<select className="form-control"
				value={url}
				onChange={ e => seturl(e.target.value) }>
			{available_urls.map(opt =>
				<option key={opt[0]} value={opt[0]}>{opt[1]}</option>
			)}
		</select>
		<input className="form-control" value={url} onChange={e => seturl(event.target.value)} />
		<button className="btn btn-primary" onClick={doloadbyurl}>Submit</button>
	</div>;
}
export default ThemeSwitch


