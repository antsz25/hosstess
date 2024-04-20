const Joi = require('joi');
const mesaSchema = Joi.object({
    numero: Joi.number().required(),
    capacidad: Joi.number().required(),
    disponible: Joi.boolean().required(),
    personaTitular: Joi.string().optional().default(null),
})
module.exports = mesaSchema;