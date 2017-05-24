import { getData } from './api/index';
import { apiVehicleUrl } from './constants';
import { render } from './components/render';

getData(apiVehicleUrl).then(res => {
	const vehicles = JSON.parse(res).vehicles;
	return vehicles.reduce((promise, vehicle) => {
		return promise.then(Function.prototype).then(() => {
			getData(`${apiVehicleUrl}/${vehicle.id}`).then(res => {
				let meta = JSON.parse(res);
				render(vehicle, meta);
			});
		})
	}, Promise.resolve());
});


getData();
