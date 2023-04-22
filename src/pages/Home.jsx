import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitch from "../components/theme-switch";
import FileInputForm from "../components/file-input-form";
import FlipCard from "../components/flip-card";
import { shuffleArray, reverseString } from "../util/util";



const Home = () => {
	const [loading, setloading] = useState(false);
	const [config, setconfig] = useState(undefined);
	const [content, setcontent] = useState(undefined);

	document.body.className = 'dark-theme';

	const loadcontent = content => {
		var lines = content.split('\n').map(s => s.trim()).filter(s => s);
		var instruction_lines = lines.filter(s => s.startsWith('::')).map(s => s.substr(2));
		var card_lines = lines.filter(s => !s.startsWith('::'));
		var parsed_content = card_lines.map(s => s.split(/:|：/).map(s => s.trim()));

		var parsed_config = {};
		instruction_lines.forEach(s => {
			var parts = s.split(':');
			parsed_config[parts[0]] = parts.length > 1 ? parts[1] : true;
		});
		// console.log(parsed_content);
		setloading(false);
		setconfig(parsed_config);
		setcontent(shuffleArray(parsed_content));
	};

	var random_index = Math.floor(Math.random() * 1000000);

	const sortArray = arr => {
		if (config.sort_by_tail) arr.forEach(a => a[0] = reverseString(a[0]));
		arr.sort((a, b) => a[0].localeCompare(b[0], config.locale));
		if (config.sort_by_tail) arr.forEach(a => a[0] = reverseString(a[0]));
		return arr;
	};

	const reverseCardsArray = arr => {
		arr.forEach(a => a.reverse());
		return arr;
	};


	const ButtonsRow = () => (<div className="text-center p-2">
			{/*<ThemeSwitch />*/}
			<div className="ml-2 d-inline"><button className="btn btn-secondary tooltip-button sort-button" onClick={e => setcontent(sortArray(content).map(a => a))}>Sort</button></div>
			<div className="ml-2 d-inline"><button className="btn btn-secondary tooltip-button shuffle-button" onClick={e => setcontent(shuffleArray(content).map(a => a))}>Shuffle</button></div>
			<div className="ml-2 d-inline"><button className="btn btn-secondary tooltip-button flip-button" onClick={e => setcontent(reverseCardsArray(content).map(a => a))}>Flip All</button></div>
			<div className="ml-2 d-inline"><button className="btn btn-primary" onClick={e => setcontent(undefined)}>Back to Menu</button></div>
		</div>);

	return (loading ? <div><h1>Loading...</h1></div> :
		<div>
			{content
				? <div>
					<ButtonsRow />
					<div className="container">
						<div className="row">
							{content.map((entry, i) => <FlipCard config={config} data={entry} key={entry[0] + ":" + i + ":" + random_index} />)}
						</div>
					</div>
					<ButtonsRow />
				</div>

				: <div>
					{/*<div className="text-center"><ThemeSwitch /></div>*/}
					<div><FileInputForm onload={loadcontent} setloading={setloading} /></div>
				</div>}
		</div>
	);
}
export default Home


