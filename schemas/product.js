//su funcion es validar la info que me llega desde el cliente

const Joi = require('joi');

//lo que deben cumplir
const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(15);
const price = Joi.number().integer().min(10);

const createProductSchema = Joi.object({
  name: name.required(), //necesito que me envien ese dato
  price : price.required(),

})

const updateProductSchema = Joi.object({
  name: name, //no es requerido
  price : price,

})


const getProductSchema = Joi.object({
  id: id.required(),

})

//creamos un middleware que me valide esto

module.exports = {createProductSchema,updateProductSchema,getProductSchema}
