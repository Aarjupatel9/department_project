const joi = require('joi');



exports.achievementValidator = joi.object({
    achievementType: joi.string().max(20).required(),
    description: joi.string().max(300).required(),
    achievedOn: joi.date().max('now').required(),
    certificates: joi.array().items(
        joi.object({
            title: joi.string().required(),
            url: joi.string().required()
        })
    )
});
