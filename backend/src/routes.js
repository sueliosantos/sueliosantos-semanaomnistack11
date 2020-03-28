const express = require('express');
const OngController = require('./controllers/OngController');
const CasosController = require('./controllers/CasosController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routs = express.Router();

//routs.post('/sessions', SessionController.create);

routs.get('/ongs',  OngController.index);
routs.post('/ongs', OngController.create);

routs.get('/casos',  CasosController.index);
routs.post('/casos', CasosController.create);
routs.delete('/casos/:id', CasosController.delete);


routs.get('/profile',  ProfileController.index);

module.exports = routs;