import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitch from "../components/theme-switch";
import FileInputForm from "../components/file-input-form";
import FlipCard from "../components/flip-card";
import MatchCard from "../components/match-card";
import { shuffleArray, reverseString, groupBy } from "../util/util";



const Home = () => {
	const [loading, setloading] = useState(false);
	const [config, setconfig] = useState(undefined);
	const [runtimeconfig, setruntimeconfig] = useState({});
	const [content, setcontent] = useState(undefined);
	// const [stats, setstats] = useState({});
	const selectedcard = useRef(null);

	document.body.className = 'dark-theme';

	const loadcontent = content => {
		var lines = content.split('\n').map(s => s.trim()).filter(s => s);
		var instruction_lines = lines.filter(s => s.startsWith('::')).map(s => s.substr(2));
		var card_lines = lines.filter(s => !s.startsWith('::'));
		var parsed_content = card_lines.map(s => s.split(/:|：/).map(s => s.trim()));

		var parsed_config = {};
		instruction_lines.forEach(s => {
			var parts = s.split(':');
			parsed_config[parts[0]] = parts.length > 1 ? parts[1] : true;
		});
		// console.log(parsed_content);
		setloading(false);
		setconfig(parsed_config);
		setruntimeconfig({ ...runtimeconfig, match_cards: false });
		setcontent(shuffleArray(parsed_content));
	};

	var random_index = Math.floor(Math.random() * 1000000);

	const sortArray = arr => {
		if (config.sort_by_tail) arr.forEach(a => a[0] = reverseString(a[0]));
		arr.sort((a, b) => a[0].localeCompare(b[0], config.locale));
		if (config.sort_by_tail) arr.forEach(a => a[0] = reverseString(a[0]));
		return arr;
	};

	const reverseCardsArray = arr => {
		arr.forEach(a => a.reverse());
		return arr;
	};

	const setselectedcard = card => {
		selectedcard.current?.classList.toggle('selected');
		selectedcard.current = card;
		selectedcard.current?.classList.toggle('selected');
	}

	const onmatchcardclick = card => {
		if (selectedcard.current === null) {
			setselectedcard(card);
		} else if (content.some(other => (other[0] === card.dataset.value && other[other.length - 1] === selectedcard.current.dataset.value)
				|| (other[other.length - 1] === card.dataset.value && other[0] === selectedcard.current.dataset.value))) {
			selectedcard.current.classList.toggle('doflip');
			card.classList.toggle('doflip');

			var toremove = [ selectedcard.current, card ];
			setTimeout(() => {
				toremove.forEach(e => e.remove());
			}, 500);
			setselectedcard(null);
		} else {
			// console.log("wrong card: ", card.dataset.value,  " vs: ", selectedcard.current.dataset.value);
			setselectedcard(null);
		}
	};

	var stats = {};
	const updatestats = (prop, val) => {
		stats[prop] = val;
		console.log("stats:", stats);
	};

	const filterDifficultCards = arr => {
		arr = arr.filter(card => stats[card[0]+"_clicked"]);
		console.log("stats:", stats);
		return arr;
	};


	const ButtonsRow = () => (<div className="text-center p-2">
			{/*<ThemeSwitch />*/}
			<div className="ml-2 d-inline"><button className="btn btn-secondary tooltip-button sort-button"
					onClick={e => setcontent(sortArray(content).map(a => a))}>Sort</button></div>
			<div className="ml-2 d-inline"><button className="btn btn-secondary tooltip-button shuffle-button"
					onClick={e => setcontent(shuffleArray(content).map(a => a))}>Shuffle</button></div>
			<div className="ml-2 d-inline"><button className="btn btn-secondary tooltip-button flip-button"
					onClick={e => setcontent(reverseCardsArray(content).map(a => a))}>Flip All</button></div>
			<div className="ml-2 d-inline"><button className="btn btn-secondary tooltip-button matchcards-button"
					onClick={e => setruntimeconfig({ ...runtimeconfig, match_cards: !runtimeconfig.match_cards })}>
				{ runtimeconfig.match_cards ? 'Flip Cards' : 'Match Cards'}
			</button></div>
			<div className="ml-2 d-inline"><button className="btn btn-warning tooltip-button filter-difficult-button"
					onClick={e => setcontent(filterDifficultCards(content).map(a => a))}>Filter Difficult Cards</button></div>
			<div className="ml-2 d-inline"><button className="btn btn-primary"
					onClick={e => setcontent(undefined)}>Back to Menu</button></div>
		</div>);

	return (loading ? <div><h1>Loading...</h1></div> :
		<div>
			{content
				? <div>
					<ButtonsRow />
					{ runtimeconfig.match_cards ?
						Object.values(groupBy(content, (v, i) => i - i % 9)).map((group, i) => <div key={i} className="container">
							<div className="row">
								<div className="col-5 container">
									<div className="row">
										{group.map((entry, i) => <MatchCard key={entry[0] + ":" + i + ":" + random_index} config={config} data={entry[0]} onclick={onmatchcardclick} />)}
									</div>
								</div>
								<div className="p-1"></div>
								<div className="col-5 container">
									<div className="row">
										{shuffleArray([...group]).map((entry, i) => <MatchCard key={entry[entry.length - 1] + ":" + i + ":" + random_index} config={config} data={entry[entry.length - 1]} onclick={onmatchcardclick} />)}
									</div>
								</div>
							</div>
							<hr />
						</div>)
					:
						<div className="container">
							<div className="row">
									{ content.map((entry, i) => <FlipCard key={entry[0] + ":" + i + ":" + random_index} config={config} data={entry} onClick={() => updatestats(entry[0] + "_clicked", true)} />) }
							</div>
						</div>
					}
					<ButtonsRow />
				</div>

				: <div>
					{/*<div className="text-center"><ThemeSwitch /></div>*/}
					<div><FileInputForm onload={loadcontent} setloading={setloading} /></div>
				</div>}
		</div>
	);
}
export default Home


