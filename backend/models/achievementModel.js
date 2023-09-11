const mongoose = require('mongoose');

const achievementSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        index: true,
        required: true
    },
    achievementType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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
    }],
    achievedOn: {
        type: Date,
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: "Achievement date cannot be in the future."
        }
    },

});

const achievementModel = mongoose.model('achievements', achievementSchema);

module.exports = achievementModel;