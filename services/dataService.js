const GlobalModal = require('../models/globalModal');

const PersonInfo = require('../models/tracking');

const InsertData = (data, cb) => {
    GlobalModal.findOne({ findByState: data.findByState }, (err, resultData) => {
        if (err) cb(false, { msg: err });
        else {
            if (!resultData) {
                GlobalModal.create(data, (err, result) => {
                    if (err) cb(false, { msg: err });
                    cb(true, { success: true, data: result, msg: "Data Inserted successfully" })
                })
            } else {
                var updateFields = {
                    updatedDateTime: data.updatedDateTime,
                    stats: data.stats
                }
                GlobalModal.updateOne({ findByState: data.findByState }, updateFields, (err, result) => {
                    if (err) cb(false, { msg: err });
                    cb(true, { success: true, data: result, msg: "Data Updated successfully" })
                })
            }
        }
    })

}
const getDataFromDB = (data, cb) => {
    GlobalModal.findOne({ findByState: data.state }, (err, resultData) => {
        if (err) cb(null, false);
        else {
            cb(null, resultData)
        }
    })
}


const InsertPersonInfo = async(data, cb) => {
    await PersonInfo.findOne({ mobile: data.mobile }, (err, resultData) => {
        if (err) cb(false, { msg: err });
        else {
            if (!resultData) {
                PersonInfo.create(data, (err, result) => {
                    if (err) cb(false, { msg: err });
                    cb(true, { success: true, data: result, msg: "User Inserted successfully" })
                })
            } else {
                var updateFields = {
                    name: data.name,
                    geometry: data.geometry,
                    effected: data.effected
                }
                PersonInfo.updateOne({ mobile: data.mobile }, updateFields, (err, result) => {
                    if (err) cb(false, { msg: err });
                    cb(true, { success: true, data: result, msg: "Data Updated successfully" })
                })
            }
        }
    })
}

const getNearPersonInfo = (data, cb) => {
    PersonInfo.aggregate()
        .near({
            near: {
                type: "Point",
                coordinates: [parseFloat(data.lng), parseFloat(data.lat)]
            },
            maxDistance: parseInt(data.distance), //300000 300 KM
            spherical: true,
            distanceField: "distance"
        })
        .then(result => {
            console.log(result);
            if (result) {
                if (result.length === 0)
                    cb(null, { message: "maxDistance is too small, or your query params {lng, lat} are incorrect (too big or too small)." });
                else
                    cb(null, result);
            }
        })
}
module.exports = {
    InsertData: InsertData,
    getDataFromDB: getDataFromDB,
    InsertPersonInfo: InsertPersonInfo,
    getNearPersonInfo: getNearPersonInfo
}