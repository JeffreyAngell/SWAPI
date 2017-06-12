'use strict';

const Router = require('express').Router();
const characterDao = require('../dao/').characters;

Router.get('/:name', function(req, res) {
	characterDao.getCharacterByName(req.params.name).then(function(data) {
		res.render('../views/character', {character: data});
	});
});

module.exports = Router;
