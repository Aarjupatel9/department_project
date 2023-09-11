const Joi = require('joi');
const DESIGNATIONS = {
    HOD: 'hod',
    ASSOCIATE_PROFESSOR: 'associate professor',
    ASSISTANT_PROFESSOR: 'assistant professor',
    // Add more designations as needed
};

export const eventDetailValidator = Joi.object({
    userId: Joi.string(),
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    isOrganizedByBVM: Joi.boolean().required(),
    eventType: Joi.string().required(),
    contributors: Joi.array().items(Joi.string().min(3).max(50)),
    experts: Joi.array().items(Joi.string().min(3).max(50)),
    numberOfParticipants: Joi.number().min(0).required(),
    totalExpenses: Joi.number().min(0).required(),
    eventDate: Joi.object({
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
    }).required(),
    organizedUnder: Joi.string().min(3).max(100).required(),
    address: Joi.object({
        city: Joi.string().min(3).max(50).required(),
        state: Joi.string().min(3).max(50).required(),
        country: Joi.string().min(3).max(50).required(),
        zip: Joi.string().min(3).max(20).required(),
    }).required(),
    report: Joi.array().items(
        Joi.object({
            title: Joi.string().min(3).max(100).required(),
            url: Joi.string().uri().required(),
        })
    ),
});
