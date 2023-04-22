
export const shuffleArray = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return array;
};



export const reverseString = s => [...s].reverse().join("");

// https://www.stefanjudis.com/snippets/how-trigger-file-downloads-with-javascript/
export const downloadStringFile = (filename, text) => {
	const myfile = new File([text], filename);

	// Create a link and set the URL using `createObjectURL`
	const link = document.createElement("a");
	link.style.display = "none";
	link.href = URL.createObjectURL(myfile);
	link.download = myfile.name;

	// It needs to be added to the DOM so it can be clicked
	document.body.appendChild(link);
	link.click();

	// To make this work on Firefox we need to wait
	// a little while before removing it.
	setTimeout(() => {
		URL.revokeObjectURL(link.href);
		link.parentNode.removeChild(link);
	}, 0);
};


