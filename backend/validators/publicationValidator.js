const joi = require("joi");
const { PUBLICATION_TYPE } = require("../utils/constants");

exports.publicationValidator = joi.object({
    title: joi.string().min(3).max(30).required(),
    description: joi.string().min(10).max(300).required(),
    authors: joi.array().items(joi.string().min(3).max(60)),
    publicationType: joi.string().valid(...Object.values(PUBLICATION_TYPE)).required(),
    publicationDate: joi.date().format('DD-MM-YYYY').max('now').required(),

    publisher: joi.when('publicationType', {
        is: PUBLICATION_TYPE.JOURNALS,
        then: joi.string().required()
    }),

    volumeNo: joi.when('publicationType', {
        is: PUBLICATION_TYPE.JOURNALS,
        then: joi.string().required()
    }),

    issueNo: joi.when('publicationType', {
        is: PUBLICATION_TYPE.JOURNALS,
        then: joi.string().required()
    }),

    pageNoRange: joi.object().when('publicationType', {
        is: PUBLICATION_TYPE.JOURNALS,
        then: joi.object({
            startPageNo: joi.number().min(0).required(),
            endPageNo: joi.number()
                .min(0)
                .greater(joi.ref('startPageNo'))
                .required()
                .messages({
                    'number.greater': 'End page number should be greater than Start page number.'
                }),
        })
    }),

    address: joi.object().when('publicationType', {
        is: PUBLICATION_TYPE.CONFERENCE,
        then: joi.object({
            city: joi.string().required(),
            state: joi.string().required(),
            country: joi.string().required(),
            zip: joi.string().required()
        })
    })
});
