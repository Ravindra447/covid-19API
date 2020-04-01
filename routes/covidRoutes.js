const express = require('express');
const routes = express.Router();
const ApiController = require('../controllers/apiController');



routes.get('/getCovidDataByState/:state', ApiController.getDataFromDB);

routes.post('/inserPersonInfo', ApiController.insertPersonInfo);

routes.get('/getNearPersonInfo/:lat/:lng/:distance', ApiController.getNearPersonInfo);


module.exports = routes;