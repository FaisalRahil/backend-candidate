const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
    // log to consol for dev
    console.log(err.stack.red);
    let error = { ...err };

    error.message = err.message;

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        const message = `Resource not found ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "server error"
    });
};

module.exports = errorHandler;
