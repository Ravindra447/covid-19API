const utils = require('../utils/coronaApiProvider');

const dataService = require('../services/dataService');
const getGlobalData = (state, cb) => {
    utils.allGlobal(state, (err, result) => {
        if (err) cb(null, false);
        else {
            result['findByState'] = state;
            // console.log(result);
            dataService.InsertData(result, (status, result) => {
                cb(null, true)
            })

        }
    });
}

module.exports = {
    getGlobalData: getGlobalData
}