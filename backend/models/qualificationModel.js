const mongoose = require('mongoose');
const { QUALIFICATION_STATUS, QUALIFICATION_TYPE } = require('../utils/constants')

const qualificationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        index: true,
        required: true
    },
    QUALIFICATION_TYPE: {
        type: String,
        enum: Object.values(QUALIFICATION_TYPE),
        required: true
    },
    thesisTitle: {
        type: String,
        required: function () {
            return this.QUALIFICATION_TYPE == QUALIFICATION_TYPE.PHD;
        }
    },
    specialization: {
        type: String,
        required: true
    },
    institute: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(QUALIFICATION_STATUS),
        default: QUALIFICATION_STATUS.COMPLETED
    },
    completionYear: {
        type: Number,
        required: true,
        min: 4,
        max: 4
    },
    certificate: [{
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }]
});

const qualificationModel = mongoose.model('qualifications', qualificationSchema);

module.exports = qualificationModel;