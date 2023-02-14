import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";



const Home = () => {
	const [url, seturl] = useState('');
	const [loading, setloading] = useState(false);
	const [content, setcontent] = useState(undefined);
	const asdf = e => console.log("change:", e);

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
				<h1>Yes</h1>
				<input className="form-control" onChange={e => seturl(event.target.value)} />
				<button className="btn btn-primary" onClick={doload}>Submit</button>
			</div>)
	);
}
export default Home


