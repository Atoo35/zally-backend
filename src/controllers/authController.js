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
        const response = await authService.verifyMagicLink(token);
        res.status(OK).json(response);
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.info(`authController: logout for email:${email}`);
        await authService.logout(email);
        res.status(OK).json({ message: 'Logged out' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    sendMagicLink,
    verifyMagicLink,
    logout,
};
