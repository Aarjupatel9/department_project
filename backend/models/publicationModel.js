const mongoose = require("mongoose");
const { PUBLICATION_TYPE } = require('../utils/constants');

const publicationSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    authors: [
        {
            type: String,
            required: true
        }
    ],
    publicationType: {
        type: String,
        enum: Object.values(PUBLICATION_TYPE),
        required: true
    },
    publicationDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: "Publication date cannot be in the future."
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

    // Attributes for journals
    publisher: {
        type: String,
        required: function () {
            return this.typeOfPublication === PUBLICATION_TYPE.JOURNALS;
        },
    },
    volumeNo: {
        type: String,
        required: function () {
            return this.typeOfPublication === PUBLICATION_TYPE.JOURNALS;
        },
    },
    issueNo: {
        type: String,
        required: function () {
            return this.typeOfPublication === PUBLICATION_TYPE.JOURNALS;
        },
    },
    pageNoRange: {
        startPageNo: {
            type: Number,
            required: function () {
                return this.typeOfPublication === PUBLICATION_TYPE.JOURNALS;
            },
        },
        endPageNo: {
            type: Number,
            required: function () {
                return this.typeOfPublication === PUBLICATION_TYPE.JOURNALS;
            },
        },
    },

    // Attribute for conferences
    address: {
        city: {
            type: String,
            required: function () {
                return this.typeOfPublication === publicationType.CONFERENCE;
            },
        },
        state: {
            type: String,
            required: function () {
                return this.typeOfPublication === publicationType.CONFERENCE;
            },
        },
        country: {
            type: String,
            required: function () {
                return this.typeOfPublication === publicationType.CONFERENCE;
            },
        },
        zip: {
            type: String,
            required: function () {
                return this.typeOfPublication === publicationType.CONFERENCE;
            },
        },
    },
});

const publicationModel = mongoose.model("publications", publicationSchema);

module.exports = publicationModel;
