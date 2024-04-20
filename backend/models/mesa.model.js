const Joi = require('joi');
const mesaSchema = Joi.object({
    numero: Joi.number().required(),
    nombre: Joi.string().required(),
    capacidad: Joi.number().required(),
    disponible: Joi.boolean().optional().default(true),
    mesero: Joi.string().optional().allow(null).default(null),
    personaTitular: Joi.string().optional().allow(null).default(null),

})
module.exports = mesaSchema;