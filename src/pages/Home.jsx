import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitch from "../components/theme-switch";
import FileInputForm from "../components/file-input-form";
import FlipCard from "../components/flip-card";



const Home = () => {
	const [loading, setloading] = useState(false);
	const [content, setcontent] = useState(undefined);



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
				{content.map(entry => <FlipCard data={entry} key={entry[0]} />)}
			</div>

			: <div>
				<h1>Drop file or pick a github url:</h1>
				<ThemeSwitch />
				<FileInputForm onload={loadcontent} setloading={setloading} />
			</div>)
	);
}
export default Home


