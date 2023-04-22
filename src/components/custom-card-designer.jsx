import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { downloadStringFile } from "../util/util";


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
		{values_list.map((v, i) => <div className="col-auto p-0" key={i}>
			<input className="w-100 form-control"
				type="text"
				placeholder={ i === 0 ? "Card front" : "Card back" }
				value={v}
				style={{borderRadius: '0px'}} 
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

const CustomTextEditor = ({ value, setvalue }) => {
	// const [loading, setloading] = useState(false);

	return <div className="row">
		<div className="form-group" style={{width: '100%', minHeight: '400px'}}>
			<textarea className="form-control" value={value} onChange={e => setvalue(e.target.value)} style={{width: '100%', minHeight: '400px'}} />
		</div>
	</div>;
}


const CustomCardDesigner = ({ title, settitle, customtext, setcustomtext }) => {
	// const [data, setdata] = useState([ ':' ]);
	const [mode, setmode] = useState('fancy-editor');

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
		{ mode === 'fancy-editor' ? <>
			{data.map((r,i) => <CustomCardRow key={i} value={r} setvalue={v => setByIndex(i, v)} deleteMe={() => deleteByIndex(i)} />)}
		</> : <>
			<CustomTextEditor value={customtext} setvalue={v => setcustomtext(v)} />
		</>}
		<div className="col-auto p-1">
			{ mode === 'fancy-editor' ?
				<div className="ml-2 d-inline"><button className="btn btn-success" onClick={e => setdata([ ...data, ':' ])}>Add Row</button></div>
				: '' }
			<div className="ml-2 d-inline"><button className="btn btn-warning" onClick={e => setmode(mode === 'fancy-editor' ? 'text-editor' : 'fancy-editor')}>
				{ mode === 'fancy-editor' ? 'Edit as Text' : 'Edit as Cells'}
			</button></div>
			<div className="ml-2 d-inline"><button className="btn btn-warning" onClick={e => downloadStringFile('cards.txt', customtext)}>Download File</button></div>
		</div>
	</div>;
}

export default CustomCardDesigner


