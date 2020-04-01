const dataService = require('../services/dataService');

const getDataFromDB = async(req, res) => {
    //if we inserted same data it will create second version with single record update
    await dataService.getDataFromDB(req.params, (err, result) => {
        if (err) console.log(err);
        if (result) {
            res.status(200);
            res.json({ satus: true, msg: "Data retrived successfully.", result: result })
        } else {
            res.status(500);
            res.json({ satus: false, msg: "Data retrived failed." })
        }
    })
}

const insertPersonInfo = async(req, res) => {
    await dataService.InsertPersonInfo(req.body, (err, result) => {
        if (err) console.log(err);
        if (result) {
            res.status(200);
            res.json({ satus: true, msg: "Data Inserted successfully.", result: result })
        } else {
            res.status(500);
            res.json({ satus: false, msg: "Data inserted failed." })
        }
    })
}

const getNearPersonInfo = async(req, res) => {
    let data = {
        lat: req.params.lat,
        lng: req.params.lng,
        distance: req.params.distance
    }
    await dataService.getNearPersonInfo(data, (err, result) => {
        if (err) console.log(err);
        if (result) {
            res.status(200);
            res.json({ satus: true, msg: "Data retrived successfully.", result: result })
        } else {
            res.status(500);
            res.json({ satus: false, msg: "Data retrived failed." })
        }
    })
}

module.exports = {
    getDataFromDB: getDataFromDB,
    insertPersonInfo: insertPersonInfo,
    getNearPersonInfo: getNearPersonInfo
}