import { getData } from './api/index';
import { apiVehicleUrl } from './constants';
//import { mustache } from '../node_modules/mustache/mustache.js';
const Mustache = require('mustache');

getData(apiVehicleUrl).then(res => {
	const vehicles = JSON.parse(res).vehicles;
	return vehicles.reduce((promise, vehicle) => {
		return promise.then(Function.prototype).then(() => {
			getData(`${apiVehicleUrl}/${vehicle.id}`).then(res => {

				const vehicleData = {};

				Object.assign(vehicleData, vehicle, JSON.parse(res));

				vehicleData.meta.emissions.output = vehicleData.meta.emissions.template.replace('$value', vehicleData.meta.emissions.value);

				getData('./components/vehicle-card.html').then(template => {
					const vehicleCard = Mustache.render(template, vehicleData);

					const card = document.createElement('div');
					card.innerHTML = vehicleCard;

					const container = document.getElementById('container');
					container.appendChild(card);

				});

			});
		})
	}, Promise.resolve());
});

