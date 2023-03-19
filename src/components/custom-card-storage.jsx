import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";
import { loadCustomCards } from "../util/storage";



const CustomCardStorage = ({ doloadcustombyname }) => {
	const [saveddata, setsaveddata] = useState(loadCustomCards());

	return <div className="p-1">
		<h3>Select a previously saved card set, or select 'Create New' to make a new one:</h3>
		<hr />
		{Object.keys(saveddata).map(k => <div key={k} className="p-1">
			<button className="btn btn-success" onClick={() => doloadcustombyname(k)}>{"Load: " + k}</button>
		</div>)}
	</div>;
}
export default CustomCardStorage


