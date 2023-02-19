import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";



const FlipCard = (props) => {

	return <div>
		<h3>question:{props.data[0]}</h3>
		<p>answer:{props.data[1]}</p>
	</div>;
}
export default FlipCard




