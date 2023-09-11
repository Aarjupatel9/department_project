const joi = require('joi');
const { QUALIFICATION_TYPE, QUALIFICATION_STATUS } = require('../utils/constants');

exports.qualificationValidator = joi.object({
    QUALIFICATION_TYPE: joi.string().valid(...Object.values(QUALIFICATION_TYPE)).required(),
    thesisTitle: joi.string().when('QUALIFICATION_TYPE', {
        is: QUALIFICATION_TYPE.PHD,
        then: joi.string().required()
    }),
    specialization: joi.string().required(),
    institute: joi.string().required(),
    status: joi.string().valid(...Object.values(QUALIFICATION_STATUS)),
    completionYear: joi.number().integer().min(1900).max(new Date().getFullYear()).required()
});
