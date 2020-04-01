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
        type: String,
        required: [true, 'Name field is required']
    },
    mobile: {
        type: Number,
        required: [true, 'Mobile field is required']
    },
    effected: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

const personInfo = mongoose.model("personinfo", model)

module.exports = personInfo;