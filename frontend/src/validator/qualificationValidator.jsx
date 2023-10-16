const joi = require('joi');

const QUALIFICATION_STATUS = {
    COMPLETED: 'completed',
    PURSUING: 'pursuing'
};

const QUALIFICATION_TYPE = {
    BTECH: "B. tech.",
    MTECH: "M. tech.",
    PHD: "PhD"
}

export const qualificationValidator = joi.object({
    qualificationType: joi.string().valid(...Object.values(QUALIFICATION_TYPE)).required(),
    thesisTitle: joi.string().when('QUALIFICATION_TYPE', {
        is: QUALIFICATION_TYPE.PHD,
        then: joi.string().required()
    }),
    specialization: joi.string().required(),
    institute: joi.string().required(),
    status: joi.string().valid(...Object.values(QUALIFICATION_STATUS)),
    completionYear: joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    certificates: joi.array().items(
        joi.object({
            title: joi.string().required(),
            url: joi.string().required()
        })
    )
});
