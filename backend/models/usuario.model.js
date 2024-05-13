const Joi = require('joi');
const userSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    cellphone: Joi.string().min(10).max(10).required().pattern(/^^\d{10}$$/),
    role: Joi.string().required().valid('admin','hosstess'),
})
module.exports = userSchema;