const joi = require('joi');
const GUIDE_TYPE = {
    MTECH: "M tech",
    PHD: "PhD",
}

export const guideValidator = joi.object({
    userId: joi.string().required(),
    guideType: joi.string().valid(...Object.values(GUIDE_TYPE)).required(),
    dissertationTitle: joi.string().min(5).max(300),
    guidedYear: joi.number().required(),
    studentDetails: joi.object({
        name: joi.string().min(3).max(60).required(),
        idNumber: joi.string().length(7),
    }),
    reports: joi.array().items(
        joi.object({
            title: joi.string().required(),
            url: joi.string().required()
        })
    )
});