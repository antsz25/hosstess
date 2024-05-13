const Joi = require('joi');
const userSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    birthDate: Joi.date().required(),
    cellphone: Joi.string().min(10).max(10).required().pattern(/^^\d{10}$$/),
    mesa: Joi.number().optional().default(0), // Mesa no asignada ubicada como mesa 0
    role: Joi.string().required().valid('waiter').default('waiter'),
    workSchedule: Joi.string().optional().valid('morning','afternoon','evening'),
    status: Joi.string().valid('active','rest','inactive','attending').default('rest'),
})
module.exports = userSchema;