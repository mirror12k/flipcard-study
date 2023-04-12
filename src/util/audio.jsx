
const audio_cache = {};

export const loadAudio = url => new Promise((resolve, reject) => {
	if (audio_cache[url])
		resolve(audio_cache[url]);
	else {
		var audio = new Audio(url);
		audio.addEventListener('error', e => {
			console.log("error loading audio: ", e);
			alert('Error loading Google Translate tts. Please try again later.');
			reject(e);
		});
		audio.addEventListener('canplaythrough', e => {
			audio_cache[url] = audio;
			resolve(audio_cache[url]);
		});
	}
});

export const playAudio = async (locale, text) => {
	var audio = await loadAudio('https://translate.google.com/translate_tts?ie=UTF-8&q=' + text + '&tl='+locale+'&client=tw-ob');
	audio.play();
};





