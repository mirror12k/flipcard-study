import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitch from "../components/theme-switch";
import FileInputForm from "../components/file-input-form";
import FlipCard from "../components/flip-card";
import { shuffleArray } from "../util/util";



const Home = () => {
	const [loading, setloading] = useState(false);
	const [config, setconfig] = useState(undefined);
	const [content, setcontent] = useState(undefined);

	const loadcontent = content => {
		var lines = content.split('\n').map(s => s.trim()).filter(s => s);
		var instruction_lines = lines.filter(s => s.startsWith('::')).map(s => s.substr(2));
		var card_lines = lines.filter(s => !s.startsWith('::'));
		var parsed_content = card_lines.map(s => s.split(/:|：/).map(s => s.trim()));

		var parsed_config = {};
		instruction_lines.forEach(s => parsed_config[s] = true);
		// console.log(parsed_content);
		setloading(false);
		setconfig(parsed_config);
		setcontent(parsed_content);
	};

	var random_index = Math.floor(Math.random() * 1000000);

	return (loading ? <div><h1>Loading...</h1></div> :
		<div>
			{content
				? <div>
					<div className="text-center p-2">
						<ThemeSwitch />
						<div className="ml-2 d-inline"><button className="btn btn-secondary" onClick={e => setcontent(shuffleArray(content).map(a => a))}>Shuffle Cards</button></div>
						<div className="ml-2 d-inline"><button className="btn btn-primary" onClick={e => setcontent(undefined)}>Back to Menu</button></div>
					</div>
					<div className="container">
						<div className="row">
							{shuffleArray(content).map(entry => <FlipCard config={config} data={entry} key={entry[0] + ":" + random_index} />)}
						</div>
					</div>
					<div className="text-center p-2">
						<div className="ml-2 d-inline"><button className="btn btn-secondary" onClick={e => setcontent(shuffleArray(content).map(a => a))}>Shuffle Cards</button></div>
						<div className="ml-2 d-inline"><button className="btn btn-primary" onClick={e => setcontent(undefined)}>Back to Menu</button></div>
					</div>
				</div>

				: <div>
					<div className="text-center"><ThemeSwitch /></div>
					<div><FileInputForm onload={loadcontent} setloading={setloading} /></div>
				</div>}
		</div>
	);
}
export default Home


