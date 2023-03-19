import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";



const CustomCardRow = ({ value, setvalue, deleteMe }) => {
	// const [loading, setloading] = useState(false);

	const values_list = value.split(':');

	const setByIndex = (i, v) => {
		values_list[i] = v;
		setvalue(values_list.join(':'));
	}
	const removeLastIndex = () => {
		values_list.pop();
		setvalue(values_list.join(':'));
	}

	return <div className="row">
		{values_list.map((v, i) => <div className="col-auto p-1" key={i}>
			<input className="w-100 form-control" type="text"
				placeholder={ i === 0 ? "Card front" : "Card back" }
				value={v}
				onChange={e => setByIndex(i, e.target.value)} />
		</div>)}
		
		{/*<div className="col-auto p-1">
			<input className="w-100 form-control" type="text" placeholder="Card back" aria-label="default input example" onChange={e => setvalue([ value[0], e.target.value ])} />
		</div>*/}
		<div className="col-auto p-1">
			<button className="btn btn-success" onClick={() => setvalue(value + ':')}>+</button>
		</div>
		{values_list.length > 1 ? <div className="col-auto p-1">
					<button className="btn btn-danger" onClick={removeLastIndex}>-</button>
				</div> : <></>}
		<div className="col-auto p-1">
			<button className="btn btn-danger" onClick={deleteMe}>Remove Row</button>
		</div>
	</div>;
}


const CustomCardDesigner = ({ title, settitle, customtext, setcustomtext }) => {
	// const [data, setdata] = useState([ ':' ]);

	const data = customtext.split('\n');
	const setdata = d => { setcustomtext(d.join('\n')) };

	const setByIndex = (i, v) => {
		var copy = [ ...data ];
		copy[i] = v;
		setdata(copy);
	}
	const deleteByIndex = i => {
		var copy = [ ...data ];
		copy.splice(i, 1);
		setdata(copy);
	}

	return <div>
		<hr />
		<div className="row pb-2">
			<div className="col-2"><h3 className="d-inline">Title:</h3></div>
			<div className="col-6"><input className="form-control" value={title} onChange={e => settitle(e.target.value)} /></div>
		</div>
		{data.map((r,i) => <CustomCardRow setvalue={v => setByIndex(i, v)} value={r} key={i} deleteMe={() => deleteByIndex(i)} />)}
		<div className="col-auto p-1">
			<div className="ml-2 d-inline"><button className="btn btn-success" onClick={e => setdata([ ...data, ':' ])}>Add Row</button></div>
		</div>
	</div>;
}

export default CustomCardDesigner


