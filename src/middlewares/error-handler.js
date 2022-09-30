const createError = require('http-errors');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let errors=[];
  if(err.errors){
   Object.keys(err.errors).forEach(element => {
        errors.push(err.errors[element].message)
   });
  res.status(400).send({
    message:errors
  })

  }
  if(err.code == 11000){
    errors.push(`${Object.keys(err.keyValue)} đã được sử dụng. Vui lòng chọn ${Object.keys(err.keyValue)} khác. `)
    res.status(400).send({
      message:errors
    })
  }
  if(err.message){
    errors.push(err.message)
    res.status(400).send({
      message:errors
    })
  }

  // if err message is safe to expose to client or we are in development mode
  if (err.expose === true || process.env.NODE_ENV === 'development') {
    res.status(err.status || 500).send(err);
  } else {
    res.status(500).send(createError.InternalServerError());
  }

};

module.exports = errorHandler;
