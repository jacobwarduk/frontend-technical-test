import { getData } from './api/index.js';
import { apiVehicleUrl } from './constants.js';

getData(apiVehicleUrl).then(res => {
	const vehicles = JSON.parse(res).vehicles;

	return vehicles.reduce((promise, vehicle) => {
		return promise.then(() => {
			console.log(vehicle);
		}).then(() => {
			getData(`${apiVehicleUrl}/${vehicle.id}`).then(res => {
				// Add to page
				console.log(JSON.parse(res));
			});
		})
	}, Promise.resolve());
});


getData();
