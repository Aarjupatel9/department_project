const mongoose = require('mongoose');
const { GRANT_TYPES } = require('../utils/constants');

const grantSchema = mongoose.Schema({
    grantName: {
        type: String,
        required: true
    },
    grantAmount: {
        type: Number,
        required: true,
        min: 0
    },
    grantType: {
        type: String,
        enum: Object.values(GRANT_TYPES),
        required: true
    },
    grantDate: {
        type: Date,
        default: Date.now
    },
});

const grantModel = mongoose.model('grants', grantSchema);

module.exports = grantModel;