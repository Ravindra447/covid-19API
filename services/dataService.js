const GlobalModal = require('../models/globalModal');

const PersonInfo = require('../models/tracking');

const UserCount = require('../models/autoIncrementModal');

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

getValueForNextSequence = async(cb) => {
    await UserCount.findOneAndUpdate({ _id: "users" }, { $inc: { sequence_value: 1 } }, { useFindAndModify: false }, (err, result) => {
        cb(null, result);
    });

}
const getUserCount = (cb) => {
    UserCount.findOne({ _id: "users" }, (err, result) => {
        if (err) cb(null, err);
        if (!result) {
            UserCount.create({}, (err, result) => {
                if (err) cb(null, err);
                else {
                    cb(null, result)
                }
            });
        } else {
            getValueForNextSequence((err, result) => {
                if (err) cb(null, err);
                else {
                    cb(null, result)
                }
            })
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
    console.log(parseFloat(data.lng), parseFloat(data.lat))
    PersonInfo.createIndexes
    PersonInfo.aggregate()
        .near({
            near: {
                type: "Point",
                coordinates: [parseFloat(data.lat), parseFloat(data.lng)]
            },
            maxDistance: parseInt(data.distance), //300000 300  parseInt(data.distance)KM
            spherical: true,
            distanceField: "distance",
            query: { effected: true }
        })
        .then(result => {
            // console.log(result);
            if (result) {
                if (result.length === 0)
                    cb(null, { message: "maxDistance is too small, or your query params {lng, lat} are incorrect (too big or too small)." });
                else
                    cb(null, result);
            }
        })
        // .catch(next);

}
module.exports = {
    InsertData: InsertData,
    getDataFromDB: getDataFromDB,
    getUserCount: getUserCount,
    InsertPersonInfo: InsertPersonInfo,
    getNearPersonInfo: getNearPersonInfo
}