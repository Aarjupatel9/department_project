const joi = required('joi');
const { GUIDE_TYPE } = require('../utils/constants');

exports.guideValidator = joi.object({
    guideType: joi.string().valid(...Object.values(GUIDE_TYPE)).required(),
    dissertationTitle: joi.string().min(5).max(300),
    guidedYear: joi.number().length(4).required(),
    studentDetails: joi.object({
        name: joi.string().min(3).max(60).required(),
        idNumber: joi.string().length(7)
    })
});