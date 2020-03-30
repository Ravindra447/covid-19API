const GlobalModal = require('../models/globalModal');


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
module.exports = {
    InsertData: InsertData,
    getDataFromDB: getDataFromDB
}