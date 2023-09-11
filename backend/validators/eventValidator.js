const joi = require('joi');

exports.eventValidator = joi.object({
    title: joi.string().max(30).required(),
    description: joi.string().max(300).required(),
    isOrganizedByBVM: joi.boolean().required(),
    eventType: joi.string().max(30).required(),
    contributors: joi.array().items(joi.string().max(30)),
    experts: joi.array().items(joi.string().max(30)),
    numberOfParticipants: joi.number().min(0),
    totalExpenses: joi.number().min(0).required(),
    eventDate: joi.object({
        startDate: joi.date()
            .required()
            .less(joi.ref('endDate'))
            .messages({
                'date.base': 'Start date should be a valid date',
                'date.max': 'Start date should not be greater than today',
                'date.less': 'Start date should be less than end date',
            }),
        endDate: joi.date()
            .required()
            .messages({
                'date.base': 'End date should be a valid date',
            }),
    }),
    organizedUnder: joi.string().max(100).required(),
    address: joi.object({
        city: joi.string().min(2).max(30).required(),
        state: joi.string().min(2).max(30).required(),
        country: joi.string().min(2).max(30).required(),
        zip: joi.string().length(6).required(),
    })
});