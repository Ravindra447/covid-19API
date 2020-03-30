const express = require('express');
const routes = express.Router();

const schedularController = require('../controllers/schedularController');
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = 1;
// var j = schedule.scheduleJob('*/2 * * * *', function() {
var j = schedule.scheduleJob(rule, function() {
    //Sates global CA
    schedularController.getGlobalData('CA', (err, result) => {
        console.log('Canada Data updated.');

        if (result) {
            schedularController.getGlobalData('global', (err, result) => {
                console.log('Global data updated.');

            })
        }
    });
});

routes.get('/getDatafromCovid-19', (req, res) => {
    schedularController.getGlobalData('CA', (err, result) => {
        console.log('Canada Data updated.');

        if (result) {
            schedularController.getGlobalData('global', (err, result) => {
                console.log('Global data updated.');
                res.json({ success: true, msg: "Data updated into DB." });
            })
        }
    });
})






module.exports = routes;