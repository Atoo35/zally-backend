const { StatusCodes } = require('http-status-codes');

const errorHandler = (error, req, res, next) => {
    if (error) {
        if (error.statusCode) {
            const { statusCode, message, details } = error;
            res.status(statusCode).json({ message, details });
        } else {
            const { message, name } = error;
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message, error: name });
        }
    }
    next(error);
};

module.exports = errorHandler;
