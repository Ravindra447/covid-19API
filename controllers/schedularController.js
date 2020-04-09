const utils = require('../utils/coronaApiProvider');

const dataService = require('../services/dataService');
const coutryList = require('../utils/countryISO');

const getGlobalData = (state, cb) => {
    utils.allGlobal(state, (err, result) => {
        if (err) cb(null, false);
        else {
            result['findByState'] = state;
            // console.log(result);
            if (state === "global") {
                console.log(result);
                result.stats.breakdowns.map(data => {
                    if (data.location.isoCode == null) {
                        var obj = coutryList.list.find(country => country.Name == data.location.countryOrRegion);
                        if (obj !== undefined)
                            data.location.isoCode = obj.Code
                        else
                            console.log(data.location);
                    }
                    if (data.location.isoCode === "CA" || data.location.isoCode === "US")
                        data['isStateLevalData'] = true;
                    else
                        data['isStateLevalData'] = false;

                })
                dataService.InsertData(result, (status, result) => {
                    cb(null, true)
                })
            } else {
                dataService.InsertData(result, (status, result) => {
                    cb(null, true)
                })
            }
        }
    });
}

module.exports = {
    getGlobalData: getGlobalData
}