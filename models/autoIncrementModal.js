const mongoose = require('mongoose');

const model = mongoose.Schema({
    _id: {
        type: String,
        default: "users"
    },
    sequence_value: {
        type: Number,
        default: 0
    }
})
var userCount = mongoose.model('userCount', model);

module.exports = userCount;