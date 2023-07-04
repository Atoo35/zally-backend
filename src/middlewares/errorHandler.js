const { StatusCodes } = require('http-status-codes');

const errorHandler = (error, req, res, next) => {
    if (error) {
        if (error.statusCode) {
            const { statusCode, message, details } = error;
            res.status(statusCode).json({ message, details });
        } else {
            const { message } = error;
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
        }
    }
    next(error);
};

module.exports = errorHandler;
