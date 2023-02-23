import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";



const FlipCard = (props) => {
	const cardref = useRef(null);

	return <div className="col-md-4 m-0 flip-card" onClick={e => cardref.current.classList.toggle('doflip') } ref={cardref}>
		<div className="flip-card-inner">
			<div className="card d-block p-2 text-center flip-card-front">
				<hr />
				<h3>{props.data[0]}</h3>
			</div>
			<div className="card d-block p-2 text-center flip-card-back">
				<hr />
				<h3>{props.data[1]}</h3>
			</div>
		</div>
	</div>;
}
export default FlipCard




