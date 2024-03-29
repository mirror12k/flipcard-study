import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SoundIcon from "../icons/SoundIcon";
import { playAudio } from "../util/audio";



const FlipCard = ({ data, config, onClick }) => {
	const [frontindex, setfrontindex] = useState(0);
	const [backindex, setbackindex] = useState(-1);
	const cardref = useRef(null);

	const onPlayAudio = (e, text) => {
		e.stopPropagation();
		e.preventDefault();
		playAudio(config.locale, text);
		return false;
	};


	return <div className="m-0 flip-card small-card col-sm-3" onClick={e => {
			cardref.current.classList.toggle('doflip');
			if (cardref.current.classList.contains('doflip'))
				setbackindex((backindex + 2) % data.length);
			else
				setfrontindex((frontindex + 2) % data.length);

			onClick();
			return false;
		} } ref={cardref}>
		<div className="flip-card-inner">
			<div className="card d-block p-2 text-center flip-card-front">
				<hr />
				<h3>{data[frontindex % data.length]}</h3>
				{ config.locale ?
					<button className="btn btn-secondary audio-button" onClick={e => onPlayAudio(e, data[frontindex % data.length])}>
						<SoundIcon />
					</button>
				: ''}
			</div>
			<div className="card d-block p-2 text-center flip-card-back">
				<hr />
				<h3>{data[backindex % data.length]}</h3>
				{ config.locale ?
					<button className="btn btn-secondary audio-button" onClick={e => onPlayAudio(e, data[backindex % data.length])}>
						<SoundIcon />
					</button>
				: ''}
			</div>
		</div>
	</div>;
}
export default FlipCard




