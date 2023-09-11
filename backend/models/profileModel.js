const mongoose = require('mongoose');
const { DESIGNATIONS } = require('../utils/constants');

const profileSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        index: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    personalDetails: {
        mobileNo: {
            type: String,
            required: true
        },
        employeeId: {
            type: String,
            required: true
        },
        aadharNumber: {
            type: String,
            required: true
        },
        panNumber: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        }
    },
    bankDetails: {
        accNumber: {
            type: String,
            required: true
        },
        bankName: {
            type: String,
            required: true
        },
        branch: {
            type: String,
            required: true
        },
        IFSC_code: {
            type: String,
            required: true
        }
    },
    designation: {
        type: String,
        enum: Object.values(DESIGNATIONS),
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
    },
    joiningDate: {
        type: Date,
        required: true
    },
    experience: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    profileImage: {
        type: String
    }
});

const profileModel = mongoose.model('profiles', profileSchema);

module.exports = profileModel;