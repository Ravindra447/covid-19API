const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

const model = mongoose.Schema({
    name: {
        type: String
    },
    mobile: {
        type: Number
    },
    effected: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema,
    // token: Number,
    // user_Id: String
});

const personInfo = mongoose.model("personinfo", model)

module.exports = personInfo;