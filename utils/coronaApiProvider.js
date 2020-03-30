const PK = "e62eeb2e056a4a4389272706b070c448";
const Sk = "dbe50709e20a4e9caa157db6acc2d949"


const axios = require('axios');

const allGlobal = (state, cb) => {
    axios({
            method: 'get',
            url: 'https://api.smartable.ai/coronavirus/stats/' + state,
            headers: {
                "Cache-Control": "no - cache",
                "Subscription-Key": PK
            }
        })
        .then(function(response) {
            // console.log(response);
            cb(null, response.data)
        });
}

module.exports = {
    allGlobal: allGlobal
}