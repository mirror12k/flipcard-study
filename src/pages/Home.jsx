import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitch from "../components/theme-switch";
import FileInputForm from "../components/file-input-form";
import FlipCard from "../components/flip-card";
import { shuffleArray } from "../util/util";



const Home = () => {
	const [loading, setloading] = useState(false);
	const [content, setcontent] = useState(undefined);

	const loadcontent = content => {
		var lines = content.split('\n').map(s => s.trim()).filter(s => s);
		// var instruction_lines = lines.filter(s => s.startsWith())
		var parsed_content = lines.map(s => s.split(':').map(s => s.trim()));
		console.log(parsed_content);
		setloading(false);
		setcontent(parsed_content);
	};

	return (loading ? <div><h1>Loading...</h1></div> :
		<div>
			<ThemeSwitch />
			{content
				? <div>
					<h1>Cards:</h1>
					<div className="container">
						<div className="row">
							{shuffleArray(content).map(entry => <FlipCard data={entry} key={entry[0]} />)}
						</div>
					</div>
					<button className="btn btn-primary" onClick={e => setcontent(undefined)}>Back to Cards List</button>
				</div>

				: <div>
					<h1>Drop file or pick a github url:</h1>
					<FileInputForm onload={loadcontent} setloading={setloading} />
				</div>}
		</div>
	);
}
export default Home


