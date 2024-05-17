const joi = require('joi');
const clienteSchema = joi.object({
    nombre: joi.string().required(),
    telefono: joi.string().required(),
    posicion: joi.number().required()
});
module.exports = clienteSchema;