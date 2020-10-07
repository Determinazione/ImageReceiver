const joi = require('joi');

const registerValidation = data => {
    const schema = joi.object({
        email: joi.string()
        .email(),

        name: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

        password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,50}$')),

        repeatPassword: joi.ref('password')
    });
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = joi.object({
        email: joi.string()
        .email(),

        password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,50}$'))
    })
    schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;