const Joi = require('joi');
const userSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    birthDate: Joi.date().required(),
    startDate: Joi.date().required(),
    cellphone: Joi.string().min(10).max(10).required().pattern(/^^\d{10}$$/),
    mesa: Joi.array().optional().default(null), // Mesa no asignada asignada como null
    role: Joi.string().required().valid('waiter').default('waiter'),
    workSchedule: Joi.string().optional().valid('morning','afternoon','evening'),
    status: Joi.string().valid('active','rest').default('rest'),
})
module.exports = userSchema;