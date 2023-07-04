/* eslint-disable no-console */
const { StatusCodes: { SERVICE_UNAVAILABLE, OK } } = require('http-status-codes');
const healthService = require('../services/healthService');

const getHealthStatus = (req, res, next) => {
    console.info('healthController: getHealthStatus');
    healthService.healthCheck((error, result) => {
        if (error) {
            res.status(SERVICE_UNAVAILABLE).json(result);
            next();
        } else {
            res.status(OK).json(result);
        }
    });
};

module.exports = {
    getHealthStatus,
};
