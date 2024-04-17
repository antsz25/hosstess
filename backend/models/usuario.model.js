const Joi = require('joi');
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    mesa: Joi.number().required(),
    role: Joi.string().valid('admin','waiter' ,'client').default('client'),
})
module.exports = userSchema;