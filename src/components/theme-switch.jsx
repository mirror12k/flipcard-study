import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";



const ThemeSwitch = (props) => {
	const [theme, settheme] = useState(localStorage.getItem('color-theme') ?? 'dark-theme');

	const dosettheme = to => {
		localStorage.setItem('color-theme', to);
		settheme(to);
	}

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	return <button className="btn btn-secondary font-weight-bold"
			onClick={e => dosettheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme')}>
		{theme === 'light-theme' ? <MoonIcon /> : <SunIcon /> }
	</button>;
}
export default ThemeSwitch


