const joi = require("joi");
const { DESIGNATIONS } = require("../utils/constants");

exports.profileValidator = joi.object({
    firstName: joi.string().min(3).max(50).required(),
    lastName: joi.string().min(3).max(50).required(),
    personalDetails: joi.object({
        mobileNo: joi.string().pattern(/^\d{10}$/).required(),
        employeeId: joi.string().required(),
        aadharNumber: joi.string().length(12).required(),
        panNumber: joi.string().required(),
        dateOfBirth: joi.date().required()
    }),
    bankDetails: joi.object({
        accNumber: joi.string().required(),
        bankName: joi.string().required(),
        branch: joi.string().required(),
        IFSC_code: joi.string().required()
    }),
    designation: joi.string().valid(...Object.values(DESIGNATIONS)).required(),
    address: joi.object({
        city: joi.string().required(),
        state: joi.string().required(),
        country: joi.string().required(),
        zip: joi.string().required()
    }),
    joiningDate: joi.date().max('now').required(),
    experience: joi.number().min(0).required(),
    profileImage: joi.string().allow(null, '')
});
