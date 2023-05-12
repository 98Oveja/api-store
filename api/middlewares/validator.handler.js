const boom = require('@hapi/boom');

function validatorHandler(schema, property){
  // retorna un middelware, de forma dinámica
  return (req, res, next) =>{
    const data = req[property]; //esto hace que sea dinámico

    const {error} = schema.validate(data, {abortEarly: false});

    if(error){
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
