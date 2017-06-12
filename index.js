'use strict';

const express = require('express');

const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');

let charactersRoute, characterRoute, residentsRoute;

[charactersRoute, characterRoute, residentsRoute] = [routes.characters, routes.character, routes.planetResidents];

app.use('/characters', charactersRoute);

app.use('/character', characterRoute);

app.use('/planetresidents', residentsRoute);

app.listen(process.env.PORT || 80, () => {
	console.log('server started!');
});
