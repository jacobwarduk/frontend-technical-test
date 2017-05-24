export const render = (vehicle, meta) => {
	const title = document.createElement('div');
	title.innerHTML = `<pre>${JSON.stringify(vehicle)}</pre> <pre>${JSON.stringify(meta)}</pre> <hr>`;
	document.body.appendChild(title);
};
