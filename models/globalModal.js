const mongoose = require('mongoose');
var schema = mongoose.Schema({
    updatedDateTime: Date,
    location: Object,
    stats: Object,
    findByState: String
});
var globalData = mongoose.model('global', schema);

module.exports = globalData;