const Joi = require('joi');
const userSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    birthDate: Joi.date().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    cellphone: Joi.string().min(10).max(10).required().pattern(/^^\d{10}$$/),
    mesa: Joi.number().optional().default(0), // Mesa no asignada ubicada como mesa 0
    role: Joi.string().required().valid('admin','waiter',"hostess"),
    workSchedule: Joi.string().required().valid('morning','afternoon','evening'),
    status: Joi.string().valid('active','rest','inactive').default('rest'),
})
module.exports = userSchema;