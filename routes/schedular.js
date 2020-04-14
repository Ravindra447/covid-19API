const express = require('express');
const routes = express.Router();

const schedularController = require('../controllers/schedularController');
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = 1;
// var j = schedule.scheduleJob('*/2 * * * *', function() {
var j = schedule.scheduleJob(rule, function() {
    //Sates global CA
    schedularController.getGlobalData('global', (err, result) => {
        console.log('Global Data updated.');
        if (result) {
            schedularController.getGlobalData('CA', (err, result) => {
                console.log('Canada data updated.');
                if (result) {
                    schedularController.getGlobalData('US', (err, result) => {
                        console.log('Us data updated.');
                    })
                }
            })
        }
    });
});

routes.get('/InsertCovid-19-GlobalData', (req, res) => {
    schedularController.getGlobalData('global', (err, result) => {
        console.log('Global Data updated.');

        if (result) {
            schedularController.getGlobalData('CA', (err, result) => {
                console.log('Canada data updated.');
                if (result) {
                    schedularController.getGlobalData('US', (err, result) => {
                        console.log('US data updated.');
                        if (result) {
                            schedularController.getAllIndiaData((err, result) => {
                                console.log('IN data updated.');
                            })
                        }
                    })
                }
            })
        }
    });
})
routes.get('/InsertCovid-19-INData', (req, res) => {
    schedularController.getAllIndiaData((err, result) => {
        res.json({ success: true, msg: "Data updated into DB.", data: result })
    })
})






module.exports = routes;