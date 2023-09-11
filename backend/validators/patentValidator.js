const joi = require('joi');

exports.patentValidator = joi.object({
    title: joi.string().min(5).max(300).required(),
    summary: joi.string().min(5).max(500).required(),
    inventors: joi.array().items(joi.string().min(3).max(60)),
    patentNumber: joi.string().required(),
    patentDate: joi.date().required(),
    applicationNumber: joi.string().required(),
    filingDate: joi.date().required(),
    grantDate: joi.date().required(),
})