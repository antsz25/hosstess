const Joi = require('joi');
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    cellphone: Joi.string().min(10).max(10).required().pattern(/^^\d{10}$$/),
    mesa: Joi.number().optional().default(0), // Mesa no asignada ubicada como mesa 0
    role: Joi.string().valid('admin','waiter' ,'client').default('client'),
})
module.exports = userSchema;