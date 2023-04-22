import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SoundIcon from "../icons/SoundIcon";
import { playAudio } from "../util/audio";



const MatchCard = ({ data, config, onclick }) => {
	const [frontindex, setfrontindex] = useState(0);
	const [backindex, setbackindex] = useState(-1);
	const cardref = useRef(null);

	const onPlayAudio = (e, text) => {
		e.stopPropagation();
		e.preventDefault();
		playAudio(config.locale, text);
		return false;
	};


	return <div className="m-0 p-0 flip-card match-card small-card col-sm-4" data-value={data} onClick={e => {
			if (!cardref.current.classList.contains('doflip') && onclick(cardref.current)) {
				// cardref.current.classList.toggle('doflip');
			}
		} } ref={cardref}>
		<div className="flip-card-inner">
			<div className="card d-block p-2 text-center flip-card-front">
				<h3>{data}</h3>
				{/*config.locale ?
					<button className="btn btn-secondary audio-button" onClick={e => onPlayAudio(e, data)}>
						<SoundIcon />
					</button>
				: ''*/}
			</div>
		</div>
	</div>;
}
export default MatchCard




