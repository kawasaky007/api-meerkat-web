const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message
    //  Log to console for dev
    //  Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404)
    }
    // Mongoose duplicate key 
    if (err.code === 11000) {
        const message = `Duplicate field value entered ${Object.keys(err.keyValue)}: ${err.keyValue[Object.keys(err.keyValue)]}`;
        error = new ErrorResponse(message, 400)
    }
    //  Mongoose validate error
    if(err.name === 'ValidationError'){
        const message =Object.values(err.errors).map(val=>val.message);
        error =new ErrorResponse(message,400)
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: error.message.split(",")|| 'Server Error'
    })

}

module.exports = errorHandler;

