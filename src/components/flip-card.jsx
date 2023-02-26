import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";



const FlipCard = (props) => {
	const [frontindex, setfrontindex] = useState(0);
	const [backindex, setbackindex] = useState(-1);
	const cardref = useRef(null);

	const data = props.data;


	return <div className={ 'm-0 flip-card ' + (props.config.smallcards ? 'small-card col-sm-3' : 'col-sm-4') } onClick={e => {
			cardref.current.classList.toggle('doflip');
			if (cardref.current.classList.contains('doflip'))
				setbackindex((backindex + 2) % data.length);
			else
				setfrontindex((frontindex + 2) % data.length);
		} } ref={cardref}>
		<div className="flip-card-inner">
			<div className="card d-block p-2 text-center flip-card-front">
				<hr />
				<h3>{data[frontindex % data.length]}</h3>
			</div>
			<div className="card d-block p-2 text-center flip-card-back">
				<hr />
				<h3>{data[backindex % data.length]}</h3>
			</div>
		</div>
	</div>;
}
export default FlipCard




