const moment = require('moment');

const decorator = function(number, period) {
	this.number = number;
	this.period = period;
	this.cache = {};
};

decorator.prototype.decorate = function(func) {
	let that = this;
	return function() {
		// Yes, this won't preserve distinct object arguments, but for swapi it should be fine
		let cacheKey = Array.from(arguments).join('');
		if(that.cache[cacheKey] && moment().isBefore(that.cache[cacheKey].until)) {
			return that.cache[cacheKey].value;
		}
		that.cache[cacheKey] = {
			value: func.apply(undefined, arguments),
			until: moment().add(that.number, that.period)
		};
		return that.cache[cacheKey].value;
	};
};

module.exports = decorator;
