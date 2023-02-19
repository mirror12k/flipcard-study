import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitch from "../components/theme-switch";



const Home = () => {
	const [url, seturl] = useState('');
	const [loading, setloading] = useState(false);
	const [content, setcontent] = useState(undefined);

	const doload = () => {
		console.log("fetching:", url);
		setloading(true);
		fetch(url).then(r => r.text()).then(loadcontent);
	};


	const loadcontent = content => {
		var parsed_content = content.split('\n').map(s => s.trim()).filter(s => s).map(s => s.split(':', 2).map(s => s.trim()));
		console.log(parsed_content);
		setloading(false);
		setcontent(parsed_content);
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
		setloading(true);
		Promise.all([...e.dataTransfer.files].map(file => readFileAsync(file))).then(data => {
			setloading(false);
			// console.log('data:', data);
			loadcontent(data[0]);
		});
	}


	return (loading ? <div><h1>Loading...</h1></div> :
		(content
			? <div>
				<h1>Cards here</h1>
				{content.map(entry => <div key={entry[0]}>
					<h3>question:{entry[0]}</h3>
					<p>answer:{entry[1]}</p>
				</div>)}
			</div>

			: <div>
				<h1>Drop file or pick a github url:</h1>
				<ThemeSwitch />
			    <div className="drop-area"
					onDrop={onDrop}
					onDragOver={dragHover}
					onDragLeave={dragHover}></div>
				<input className="form-control" onChange={e => seturl(event.target.value)} />
				<button className="btn btn-primary" onClick={doload}>Submit</button>
			</div>)
	);
}
export default Home


