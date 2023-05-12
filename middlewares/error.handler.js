

// el más util
function logErrors(err, req, res, next){
  console.error(err);
  next(err); // es de tipo error, porqeue le enviamos el error
}

function errorHandler(err, req, res, next){
  res.status(500).json(
    {
      message: err.message,
      stack: err.stack
    }
  );
}
function boomErrorHandler(err, req, res, next){

  if(err.isBoom){
    const {output} = err;
    res.status(output.statusCode).json(output.payload);
  }else{
    next(err);
  }
}

module.exports = {logErrors, errorHandler, boomErrorHandler};
