const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required(),
        password2: Joi.string().min(3).required(),
    });
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    return schema.validate(data);
    
}

const userUpdate = (data) => {
    const schema = Joi.object({
        name: Joi.string(),
        password: Joi.string().required(),
        password2: Joi.string().required(),
        password3: Joi.string().required()
    });
    return schema.validate(data);
    
}

const makePost = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),

    });
    return schema.validate(data);
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.makePost = makePost;