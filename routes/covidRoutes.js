const express = require('express');
const routes = express.Router();
const ApiController = require('../controllers/apiController');



routes.get('/getCovidDataByState/:state', ApiController.getDataFromDB);


module.exports = routes;