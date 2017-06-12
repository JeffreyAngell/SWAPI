const swapiHelper = require('./swapi-helper');

function getCharacterByName (name) {
	return swapiHelper.getCharacterByName(name);
}

function getCharacters (sort, desc) {
	const sortMethods = ['name', 'mass', 'height'];
	return swapiHelper.getCharacters(50)
		.then(function(data) {
			if(!sortMethods.includes(sort)) {
				sort = undefined;
			}
			if(sort !== undefined) {
				let sortFunction = (a, b) => {
					let sortDirection = desc ? 1 : -1;
					if (a[sort] < b[sort]) {
						return sortDirection;
					} else if (a[sort] > b[sort]) {
						return -sortDirection;
					} else {
						return 0;
					}
				}
				data.sort(sortFunction);
			}
			return data;
		});
}

module.exports = {
	getCharacterByName: getCharacterByName,
	getCharacters: getCharacters
};
