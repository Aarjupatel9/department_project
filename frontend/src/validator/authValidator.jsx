import joi from "joi";


export const  userLoginValidator = joi.object({
    email: joi.string().email({ tlds: { allow: ['com', 'net', 'org', 'io'] } }).required(),
    password: joi.string().required(),
})

export const userSignUpValidator = joi.object({
    email: joi.string().email({ tlds: { allow: ['com', 'net', 'org', 'io'] } }).required(),
    password: joi.string().min(6).required(),
})

export const resetPassValidator = joi.object({
    token: joi.string().length(64).required(),
    password: joi.string().min(6).required()
})

export const  passwordValidator = joi.object({ password: joi.string().min(6).required() })

export const emailValidator = joi.object({ email: joi.string().email({ tlds: { allow: ['com', 'net', 'org', 'io'] } }).required() })

export const  tokenValidator = joi.object({
    token: joi.string().length(64).required()
})

export const  contactUsValidator = joi.object({
    name: joi.string().max(20),
    email: joi.string().email({ tlds: { allow: ['com', 'net', 'org', 'io'] } }).required(),
    message: joi.string().max(1500).required(),
    captchaToken: joi.string().required()
})