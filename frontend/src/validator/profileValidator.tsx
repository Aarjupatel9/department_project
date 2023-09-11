import joi from "joi";
const DESIGNATIONS = {
    HOD: 'hod',
    ASSOCIATE_PROFESSOR: 'associate professor',
    ASSISTANT_PROFESSOR: 'assistant professor',
    // Add more designations as needed
};

export const profileDetailValidator = joi.object({
    userId: joi.string().min(0),
    __v: joi.number().min(0),
    firstName: joi.string().min(3).max(50).required(),
    lastName: joi.string().min(3).max(50).required(),
    personalDetails: joi.object({
        mobileNo: joi.string().pattern(/^\d{10}$/).required(),
        employeeId: joi.string().required(),
        aadharNumber: joi.string().pattern(/^\d{12}$/).required(),
        panNumber: joi.string().required(),
        dateOfBirth: joi.date().required()
    }),
    bankDetails: joi.object({
        accNumber: joi.string().pattern(/^\d{11,15}$/).required(),
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
    profileImage: joi.string().required()
})
