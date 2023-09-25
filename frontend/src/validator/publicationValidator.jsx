<<<<<<< HEAD
import joi from "joi";
=======
const joi = require("joi");
// const { PUBLICATION_TYPE } = require("../utils/constants");
>>>>>>> ece1c6f7d3d0f1fcfe82949e1717bf187cd9c0a9
const PUBLICATION_TYPE = {
    JOURNALS: "journals",
    CONFERENCE: "conference",
}
<<<<<<< HEAD

export const publicationValidator = joi.object({
    userId:joi.string().required(),
=======
export const publicationValidator = joi.object({
>>>>>>> ece1c6f7d3d0f1fcfe82949e1717bf187cd9c0a9
    title: joi.string().min(3).max(30).required(),
    description: joi.string().min(10).max(300).required(),
    authors: joi.array().items(joi.string().min(3).max(60)),
    publicationType: joi.string().valid(...Object.values(PUBLICATION_TYPE)).required(),
    publicationDate: joi.date().max('now').required(),

    reports: joi.array().items(
        joi.object({
            title: joi.string().required(),
            url: joi.string().required()
        })
    ),

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
<<<<<<< HEAD
            zip: joi.string().length(6).required()
=======
            zip: joi.string().required()
>>>>>>> ece1c6f7d3d0f1fcfe82949e1717bf187cd9c0a9
        })
    })
});
