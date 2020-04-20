const utils = require('../utils/coronaApiProvider');

const dataService = require('../services/dataService');
const coutryList = require('../utils/countryISO');
const moment = require("moment");

const getGlobalData = (state, cb) => {
    utils.allGlobal(state, (err, result) => {
        if (err) cb(null, false);
        else {
            result['findByState'] = state;
            // console.log(result);
            if (state === "global") {
                // console.log(result);
                result.stats.breakdowns.map(data => {
                    if (data.location.isoCode == null) {
                        var obj = coutryList.list.find(country => country.Name == data.location.countryOrRegion);
                        if (obj !== undefined)
                            data.location.isoCode = obj.Code
                        else
                            console.log(data.location);
                    }
                    if (data.location.isoCode === "CA" || data.location.isoCode === "US" || data.location.isoCode === "IN")
                        data['isStateLevalData'] = true;
                    else
                        data['isStateLevalData'] = false;

                })
                dataService.InsertData(result, (status, result) => {
                    cb(null, true)
                })
            } else {
                result.stats.breakdowns.map(data => {
                    if (data.location.isoCode == null) {
                        var obj = coutryList.canadaList.find(satate => satate.Name == data.location.provinceOrState);
                        if (obj !== undefined)
                            data.location.isoCode = obj.Code
                            // else
                            //     console.log(data.location);
                    }
                })
                dataService.InsertData(result, (status, result) => {
                    cb(null, true)
                })
            }
        }
    });
}
const getAllIndiaData = (cb) => {
    utils.getIndiaData((err, result) => {
        if (err) cb(null, false);
        else {
            result['findByState'] = "IN";
            // console.log(moment().format('MMMM DD'));
            history = [];
            breakdowns = [];
            result.cases_time_series.forEach(element => {
                // console.log(new Date(moment(element.date, 'DD MMMM', true)))
                history.push({
                    date: moment(element.date, 'DD MMMM').format(), //"2020-01-22T00:00:00"
                    confirmed: element.totalconfirmed,
                    deaths: element.totaldeceased,
                    recovered: element.totalrecovered,
                    dailyconfirmed: element.dailyconfirmed
                })
            });
            result.statewise.forEach(element => {

                breakdowns.push({
                    "location": {
                        "long": "",
                        "countryOrRegion": "India",
                        "provinceOrState": element.state,
                        "county": "India",
                        "isoCode": coutryList.indiaList.find(country => country.Name == element.state) != undefined ? coutryList.indiaList.find(country => country.Name == element.state).Code : null,
                        "lat": ""
                    },
                    "totalConfirmedCases": element.confirmed,
                    "newlyConfirmedCases": element.deltaconfirmed,
                    "totalDeaths": element.deaths,
                    "newDeaths": element.deltadeaths,
                    "totalRecoveredCases": element.recovered,
                    "newlyRecoveredCases": element.deltarecovered,
                    "activeCases": element.active,
                    "lastupdatedtime": element.lastupdatedtime
                })
            });
            // var totalIndia = breakdowns.find(country => country.location.provinceOrState == "Total");
            // console.log(breakdowns[0]);
            // console.log(breakdowns[0].lastupdatedtime.substr(0, 10));
            result['updatedDateTime'] = moment().format();
            result['stats'] = {
                history: history,
                breakdowns: breakdowns,
                totalConfirmedCases: breakdowns[0].totalConfirmedCases,
                newlyConfirmedCases: breakdowns[0].newlyConfirmedCases,
                totalDeaths: breakdowns[0].totalDeaths,
                newDeaths: breakdowns[0].newDeaths,
                totalRecoveredCases: breakdowns[0].totalRecoveredCases,
                newlyRecoveredCases: breakdowns[0].newlyRecoveredCases,
            }
            result["location"] = {
                "long": 78,
                "countryOrRegion": "India",
                "provinceOrState": null,
                "county": null,
                "isoCode": "IN",
                "lat": 21
            }

            // console.log(result.cases_time_series.length, history.length, coutryList.indiaList.length, breakdowns.length)

            dataService.InsertData(result, (status, result) => {
                cb(null, status)
            })
        }
    });
}

module.exports = {
    getGlobalData: getGlobalData,
    getAllIndiaData: getAllIndiaData
}