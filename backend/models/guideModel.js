const mongoose = require('mongoose');
const { GUIDE_TYPE } = require('../utils/constants')

const guideSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        index: true,
        required: true
    },
    guideType: {
        type: String,
        enum: Object.values(GUIDE_TYPE),
        required: true
    },
    dissertationTitle: {
        type: String,
        required: true
    },
    guidedYear: {
        type: Number,
        required: true,
        minLength: 4,
        maxLength: 4
    },
    studentDetails: {
        name: {
            type: String,
            required: true,
        },
        idNumber: {
            type: String,
        }
    },
    report: [{
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
});

const guideModel = mongoose.model('guided', guideSchema);

module.exports = guideModel;