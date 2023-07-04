/* eslint-disable no-console */
const { StatusCodes: { OK } } = require('http-status-codes');
const authService = require('../services/authService');

const sendMagicLink = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.info(`authController: sendMagicLink for email:${email}`);
        await authService.sendMagicLink(email);
        res.status(OK).json({ message: 'Magic link sent' });
    } catch (error) {
        next(error);
    }
};

const verifyMagicLink = async (req, res, next) => {
    try {
        const { token } = req.query;
        console.info(`authController: verifyMagicLink for token:${token}`);
        const decoded = await authService.verifyMagicLink(token);
        res.status(OK).json(decoded);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    sendMagicLink,
    verifyMagicLink,
};
