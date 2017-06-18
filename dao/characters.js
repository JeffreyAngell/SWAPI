const swapiHelper = require('./swapi-helper');

function getCharacterByName (name) {
	return swapiHelper.getCharacterByName(name);
}

function getCharacters (sort, desc) {
	const sortMethods = ['name', 'mass', 'height'];
	const numericSort = ['mass', 'height'];
	return swapiHelper.getCharacters(50)
		.then(function(data) {
			if(!sortMethods.includes(sort)) {
				sort = undefined;
			}
			if(sort !== undefined) {
				let sortFunction;
				if(numericSort.includes(sort)) {
					// convert unknowns to 0, strip commas
					let castToNumber = number => {
						if(number === 'unknown') {
							return 0;
						}
						return Number(number.replace(/,/g, ''));
					};
					sortFunction = (a, b) => {
						let [x, y] = [castToNumber(a[sort]), castToNumber(b[sort])];
						if (desc) {
							return y - x;
						} else {
							return x - y;
						}
					};
				} else {
					sortFunction = (a, b) => {
						let sortDirection = desc ? 1 : -1;
						if (a[sort] < b[sort]) {
							return sortDirection;
						} else if (a[sort] > b[sort]) {
							return -sortDirection;
						} else {
							return 0;
						}
					};
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
