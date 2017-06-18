const requestPromise = require('request-promise');
const Promise = require('bluebird');

const cacheDecorator = require('./time-cache-decorator');
const request = {
	get: new cacheDecorator(1, 'day').decorate(requestPromise.get)
};

const apiBase = 'https://swapi.co/api/';

const INITIAL_PAGE = 1;
const JSON = {json: true};

function getCharacterByName (name) {
	return request.get(apiBase + 'people/?search=' + name, JSON)
		.then(data => {
			return data.results[0];
		});
}

function getCharacters (number) {
	let total = 0;
	let ret = [];
	let requestData = function(url) {
		return request.get(url, JSON)
			.then(data => {
				total += data.results.length;
				ret = ret.concat(data.results);
				if(total < number && data.next !== null) {
					return requestData(data.next);
				}
			});
	};
	return requestData(apiBase + 'people/').then(function() {
		if(ret.length > number) {
			ret = ret.slice(0, number);
		}
		return ret.slice(0, ret.length);
	});
}

function getPlanetResidents () {
	let total = 0;
	let ret = {};
	let addPlanet = function(planet) {
		return Promise.all(planet.residents.map(residentUrl => {
			return request.get(residentUrl, JSON);
		}))
			.then(function(people) {
				ret[planet.name] = people.map(person => person.name);
			});
	};
	let requestData = function(url) {
		return request.get(url, JSON)
			.then(data => {
				total += data.results.length;

				let promises = data.results.map(planet => {
					return addPlanet(planet);
				});
				
				if(total < data.count) {
					promises.push(requestData(data.next));
				}
				return Promise.all(promises);
			});
	};
	return requestData(apiBase + 'planets/').then(function() {
		return ret;
	});
}

module.exports = {
	getCharacterByName: getCharacterByName,
	getCharacters: getCharacters,
	getPlanetResidents: getPlanetResidents
};
