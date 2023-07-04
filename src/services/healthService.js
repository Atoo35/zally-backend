const { StatusCodes: { OK } } = require('http-status-codes');
const healthRepository = require('../repositories/healthRepository');

const healthCheck = (callback) => {
    const result = {};
    healthRepository.healthCheck((error) => {
        if (error) {
            result.error = [];
            result.error.push({ postgres: 'Down' });
            callback(error, result);
        } else {
            result.status = OK;
            callback(null, result);
        }
    });
};

module.exports = {
    healthCheck,
};
