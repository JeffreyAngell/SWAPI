'use strict';

const Router = require('express').Router();
const characterDao = require('../dao/').characters;

Router.get('/', function(req, res) {
	characterDao.getCharacters(req.query.sort, req.query.desc).then(function(data) {
		res.send(data);
	});
});

module.exports = Router;
