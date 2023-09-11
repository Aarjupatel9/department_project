const mongoose = require('mongoose');

const patentSchema = mongoose.Schema({
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
    summary: {
        type: String,
        required: true
    },
    inventors: [
        {
            type: String,
            required: true
        },
    ],
    patentNumber: {
        type: String,
        required: true,
    },
    patentDate: {
        type: Date,
        required: true,
    },
    applicationNumber: {
        type: String,
    },
    filingDate: {
        type: Date,
    },
    grantDate: {
        type: Date,
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
    }]
});

const patentModel = mongoose.model('patents', patentSchema);

module.exports = patentModel;