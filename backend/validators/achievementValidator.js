const joi = require("joi");

exports.achievementValidator = joi.object({
    achievementType: joi.string().max(20).required(),
    description: joi.string().max(300).required(),
    achievedOn: joi.date().format('DD-MM-YYYY').max('now').required()
});
