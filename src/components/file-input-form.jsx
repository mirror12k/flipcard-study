import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";



const ThemeSwitch = (props) => {
	const [url, seturl] = useState('');
	// const [loading, setloading] = useState(false);

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
		<input className="form-control" onChange={e => seturl(event.target.value)} />
		<button className="btn btn-primary" onClick={doloadbyurl}>Submit</button>
	</div>;
}
export default ThemeSwitch


