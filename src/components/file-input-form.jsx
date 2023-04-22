import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomCardDesigner from "./custom-card-designer";
import CustomCardStorage from "./custom-card-storage";
import { loadCustomCards, setCustomCard } from "../util/storage";



const FileInputForm = (props) => {
	const [url, seturl] = useState('example_cards/japanese-adjectives-1.txt');
	const [selectedoption, setselectedoption] = useState('');
	const [title, settitle] = useState(undefined);
	const [customtext, setcustomtext] = useState(undefined);
	// const [loading, setloading] = useState(false);

	const available_urls = [
		['', 'None'],
		['example_cards/japanese-adjectives-1.txt', 'Japanese Adjectives #1: 赤い/強い/明るい'],
		['example_cards/japanese-adjectives-2.txt', 'Japanese Adjectives #2: 短い/鋭い/可愛い'],
		['example_cards/japanese-vocab-1.txt', 'Japanese Vocab #1: 眼鏡/別に/知る'],
		['example_cards/japanese-vocab-2.txt', 'Japanese Vocab #2: 会話/間違い/文'],
		['example_cards/japanese-vocab-3.txt', 'Japanese Vocab #3: 零度/拉麺/痒い'],
		['example_cards/japanese-numbers-1.txt', 'Japanese Numbers #1: 八日/来月/四つ'],
		['example_cards/japanese-vocab-4.txt', 'Japanese Vocab #4: 濃い/羨ましい/場所'],
		['example_cards/japanese-vocab-5.txt', 'Japanese Vocab #5: 厳しい/珍しい/淋しい'],
		['example_cards/japanese-vocab-6.txt', 'Japanese Vocab #6: 論文/就活/段々'],
		['example_cards/japanese-vocab-7.txt', 'Japanese Vocab #7: 久々/優秀/多分'],
	];

	const doloadbyurl = () => {
		console.log("fetching:", url);
		props.setloading(true);
		fetch(url).then(r => r.text()).then(props.onload);
	};

	const readFileAsync = file => new Promise((resolve, reject) => {
		let reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = reject;
		reader.readAsText(file);
	});

	const dragHover = e => {
		e.stopPropagation();
		e.preventDefault();

		if (e.type === 'dragover') {
			e.target.className = 'drop-area over';
		} else {
			e.target.className = 'drop-area';
		}
	}

	const onDrop = e => {
		e.stopPropagation();
		e.preventDefault();
		props.setloading(true);
		Promise.all([...e.dataTransfer.files].map(file => readFileAsync(file))).then(data => {
			props.setloading(false);
			// console.log('data:', data);
			props.onload(data[0]);
		});
	}

	return <div>
		{ selectedoption === '' ?
			<div className="container">
				<div className="p-2"><h1 className="text-center">Please select an source:</h1></div>
				<div className="row">
					<div className="col-md-3">
						<button className="btn btn-primary select-button text-dark" style={{ backgroundColor: '#ABDAFC' }} onClick={e => setselectedoption('preset')}>
							Preset Cards
						</button>
					</div>
					<div className="col-md-3">
						<button className="btn btn-primary select-button text-dark" style={{ backgroundColor: '#ACACDE' }} onClick={e => setselectedoption('custom')}>
							Custom Cards
						</button>
					</div>
					<div className="col-md-3">
						<button className="btn btn-primary select-button text-dark" style={{ backgroundColor: '#C490D1' }} onClick={e => setselectedoption('file')}>
							Drag & Drop Cards File
						</button>
					</div>
					<div className="col-md-3">
						<button className="btn btn-primary select-button text-dark" style={{ backgroundColor: '#f0a9a1' }} onClick={e => setselectedoption('url')}>
							Load Cards by Url
						</button>
					</div>
				</div>
			</div>
		:
			<div className="container">
				<div className="row">
					<div className="col-md-2"></div>
					<div className={selectedoption === 'custom' ? "col-md-12" : "col-md-8"}>
						{ selectedoption === 'preset' ?
							<div>
								<div className="p-2">
									<h3 className="text-center">Select a preset list of cards to study:</h3>
									<select className="form-control"
											value={url}
											onChange={ e => seturl(e.target.value) }>
										{available_urls.map(opt =>
											<option key={opt[0]} value={opt[0]}>{opt[1]}</option>
										)}
									</select>
								</div>
								<div className="ml-2 d-inline"><button className="btn btn-primary" onClick={doloadbyurl}>Load</button></div>
								<div className="ml-2 d-inline"><button className="btn btn-secondary" onClick={e => setselectedoption('')}>Back</button></div>
							</div>
						: '' }
						{ selectedoption === 'custom' ?
							<div>
								{ customtext === undefined
									? <div className="p-2">
										<CustomCardStorage doloadcustombyname={k => { setcustomtext(loadCustomCards()[k]); settitle(k) }} />
										<div className="ml-2 d-inline"><button className="btn btn-primary" onClick={e => { setcustomtext(':'); settitle('My Custom Cards') }}>Create New</button></div>
										<div className="ml-2 d-inline"><button className="btn btn-secondary" onClick={e => setselectedoption('')}>Back</button></div>
									</div>
									: <>
										<div className="p-2">
											<CustomCardDesigner title={title} settitle={settitle} customtext={customtext} setcustomtext={setcustomtext} />
										</div>
										<div className="ml-2 d-inline"><button className="btn btn-primary" onClick={e => {
											props.onload(customtext);
											setCustomCard(title, customtext);
										}}>Save and Study</button></div>
										<div className="ml-2 d-inline"><button className="btn btn-secondary" onClick={e => setcustomtext(undefined)}>Back</button></div>
									</>
								}
							</div>
						: '' }
						{ selectedoption === 'file' ?
							<div>
								<div className="p-2">
									<h3 className="text-center">Drag and drop a file here to load the cards list</h3>
									<div className="drop-area bg-primary"
											onDrop={onDrop}
											onDragOver={dragHover}
											onDragLeave={dragHover}></div>
								</div>
								<div className="ml-2 d-inline"><button className="btn btn-secondary" onClick={e => setselectedoption('')}>Back</button></div>
							</div>
						: '' }
						{ selectedoption === 'url' ?
							<div>
								<div className="p-2">
									<h3 className="text-center">Enter a url (e.g. a github raw url) to load it:</h3>
									<p className="text-muted">e.g. https://raw.githubusercontent.com/mirror12k/mirror12k.github.io/master/flipcard/example_cards/japanese-adjectives-1.txt</p>
									<input className="form-control" value={url} onChange={e => seturl(event.target.value)} />
								</div>
								<div className="ml-2 d-inline"><button className="btn btn-primary" onClick={doloadbyurl}>Load</button></div>
								<div className="ml-2 d-inline"><button className="btn btn-secondary" onClick={e => setselectedoption('')}>Back</button></div>
							</div>
						: '' }
					</div>
					<div className="col-md-2"></div>
				</div>
			</div>
		}
	</div>;
}
export default FileInputForm


