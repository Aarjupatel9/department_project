const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        index: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isOrganizedByBVM: {
        type: Boolean,
        default: true,
    },
    eventType: {
        type: String,
        required: true,
    },
    contributors: [{
        type: String
    }],
    experts: [{
        type: String
    }],
    numberOfParticipants: {
        type: Number,
        required: true,
    },
    totalExpenses: {
        type: Number,
        required: true,
    },
    eventDate: {
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
    organizedUnder: {
        type: String,
        required: true,
    },
    address: {
        city: {
            type: String,
            required: function () {
                return !this.isOrganizedByBVM;
            },
        },
        state: {
            type: String,
            required: function () {
                return !this.isOrganizedByBVM;
            },
        },
        country: {
            type: String,
            required: function () {
                return !this.isOrganizedByBVM;
            },
        },
        zip: {
            type: String,
            required: function () {
                return !this.isOrganizedByBVM;
            },
        },
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

const eventModel = mongoose.model('events', eventSchema);

module.exports = eventModel;