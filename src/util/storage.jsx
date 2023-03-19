
export const loadCustomCards = () => JSON.parse(localStorage.getItem('custom-cards') || '{}')
export const setCustomCard = (title, text) => {
	var obj = { ...loadCustomCards(), [title]: text };
	// console.log('obj:', obj);
	localStorage.setItem('custom-cards', JSON.stringify(obj));
}


