const jwt = require('jsonwebtoken');
const config = require('../config/index');
const { sendEmail } = require('../utils/email');
const { INVALID_TOKEN } = require('../common/errors');
const tokenRepository = require('../repositories/tokenRepository');

const sendMagicLink = async (email) => {
    const jwtToken = jwt.sign({
        email,
        type: 'magicLink',
    }, config.server.secret, {
        expiresIn: 300, // 5 minutes
    });
    const link = `${config.server.serverUrl.trim().toString()}/verify?token=${jwtToken}`;
    console.info(`authService: sendMagicLink for email:${email} with link:${link}`);
    await sendEmail(email, 'Magic Link', `Please <a href=${link}>click here</a> to verify`);
};

const verifyMagicLink = async (token) => {
    console.info(`authService: verifyMagicLink for token:${token}`);
    const decoded = jwt.verify(token, config.server.secret);
    if (decoded.type !== 'magicLink') {
        throw new INVALID_TOKEN();
    }
    await tokenRepository.logout(decoded.email);
    const jwtToken = jwt.sign({
        email: decoded.email,
        type: 'accessToken',
    }, config.server.secret, {
        expiresIn: 86400, // 1 day
    });
    await tokenRepository.create({ access_token: jwtToken, email: decoded.email, type: 'accessToken' });
    return { email: decoded.email, accessToken: jwtToken };
};

const logout = async (email) => {
    console.info(`authService: logout for email:${email}`);
    await tokenRepository.logout(email);
};

module.exports = {
    sendMagicLink,
    verifyMagicLink,
    logout,
};
