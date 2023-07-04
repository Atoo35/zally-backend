/* eslint-disable space-before-function-paren */
/* eslint-disable max-classes-per-file */
class INVALID_TOKEN extends Error {
    constructor () {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.error = 'INVALID_TOKEN';
        this.message = 'Invalid token';
        this.statusCode = 400;
    }
}

module.exports = {
    INVALID_TOKEN,
};
