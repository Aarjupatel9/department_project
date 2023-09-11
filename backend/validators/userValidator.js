const joi = require("joi");
const { ROLES } = require("../utils/constants");

exports.userValidator = joi.object({
    email: joi.string().email(),
    password: joi.string().min(6)
})
exports.EditUserVerificationValidator = joi.object({
    email: joi.string().email(),
    password: joi.string().min(6)
})
exports.useAccountRoleValidator = joi.object({
    _id: joi.string().required(),
    role: joi.string().valid(...Object.values(ROLES)).required()
})
exports.userIdObjectValidator = joi.object({
  _id:  joi.string().length(24).messages({ messages: "valid userId required" }),
})
