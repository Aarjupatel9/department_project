const mongoose = require('mongoose');
const { ROLES } = require('../utils/constants');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.STD_USER
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the user who verified
        required: false
    },
    isApproved: {
        type: Boolean,
        default: false // ref not needed as there will be only one head who can approve 
    },
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;