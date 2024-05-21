const joi = require('joi');
const clienteSchema = joi.object({
    nombre: joi.string().required(),
    telefono: joi.string().required(),
});
module.exports = clienteSchema;