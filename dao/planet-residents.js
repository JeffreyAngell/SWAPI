const swapiHelper = require('./swapi-helper');

function getPlanetResidents () {
	return swapiHelper.getPlanetResidents();
}

module.exports = {
	getPlanetResidents: getPlanetResidents
};
