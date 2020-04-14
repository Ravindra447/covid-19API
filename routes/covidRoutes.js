const express = require('express');
const routes = express.Router();
const ApiController = require('../controllers/apiController');

const userInfo = require('../models/tracking');

routes.get('/getCovidDataByState/:state', ApiController.getDataFromDB);

routes.post('/inserPersonInfo', ApiController.insertPersonInfo);

routes.get('/getUsersCount', ApiController.getUserCount);


routes.get('/getNearPersonInfo/:lat/:lng/:distance', ApiController.getNearPersonInfo);














const csvtojson = require("csvtojson");

const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');
const aws = require('aws-sdk')

aws.config.update({
    accessKeyId: "AKIAJHPXFBLATOOBNCKA",
    secretAccessKey: "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",
});
var s3 = new aws.S3();
const storage = multerS3({
    s3: s3,
    bucket: 'kmfiles.proj',
    acl: 'public-read-write',
    metadata: function(req, file, cb) {

        cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
        var datetimestamp = Date.now();

        cb(null, "Covid-19/" + file.fieldname + '-' + +datetimestamp + file.originalname);
    }

})
const upload = multer({
        storage: storage
    })
    // const type = upload.single('image');
routes.post('/readCsvFile', upload.single('file'), async(req, res) => {
    const request = require('request')
    const csvFilePath = req.file.location;
    console.log(csvFilePath)
    await csvtojson().fromStream(request.get(csvFilePath))
        .then((jsonObject) => {
            // console.log(jsonObject)
            jsonObject.map((obj, i) => {
                obj['name'] = "user" + i;
                obj['mobile'] = 1234567890 + i;
                obj['effected'] = true;
                obj['geometry'] = {
                    coordinates: [obj.lat, obj.lng]
                };
                // delete obj.lat;
                // delete obj.lng;

            })
            console.log(jsonObject);
            res.json({ result: jsonObject })
                // userInfo.insertMany(jsonObject, (err, result) => {
                //     if (err) throw err;
                //     res.json({ msg: "inserted", result: result })
                // });
                // userInfo.createIndexes( { category : 1 , loc : "2dsphere" } )
        })
});

module.exports = routes;