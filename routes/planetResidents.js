'use strict';

const Router = require('express').Router();
const planetResidentsDao = require('../dao/').planetResidents;

Router.get('/', function(req, res) {
	planetResidentsDao.getPlanetResidents().then(function(data) {
		res.send(data);
	});
});

module.exports = Router;
