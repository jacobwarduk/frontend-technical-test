export const getData = url => {
	return new Promise((resolve, reject) => {
		const req = new XMLHttpRequest();
		req.open('GET', url);

		req.onload = () => {
			req.status === 200 ? resolve(req.responseText) : reject(Error('Unsuccessful response from the server.'));
		};

		req.onerror = () => reject(Error('There was a network error.'));

		req.send();
	});
};
