
const boom = require('@hapi/boom')


function validatorHandler(schema,property){
  return (req,res,next)=>{ //necesito retornar un middleware
    const data = req[property] //obtendo info de forma dinamica
    const {error} = schema.validate(data, {abortEarly :false}) //Para que muestre todos los errores y no solo el primero que encuentre
    if(error){
      next(boom.badRequest(error))
    }
  }
}

module.exports = validatorHandler;

//info
//post esta en req.body
//get  esta en req.params
// o en req.query
