const jwt = require('jsonwebtoken');
const config = require('../config/index');
const { sendEmail } = require('../utils/email');
const { INVALID_TOKEN } = require('../common/errors');

const sendMagicLink = async (email) => {
    try {
        const jwtToken = jwt.sign({
            email,
            type: 'magicLink',
        }, config.server.secret, {
            expiresIn: 300, // 5 minutes
        });
        const link = `${config.server.serverUrl.trim().toString()}/verify?token=${jwtToken}`;
        console.info(`authService: sendMagicLink for email:${email} with link:${link}`);
        await sendEmail(email, 'Magic Link', `Please <a href=${link}>click here</a> to verify`);
    } catch (error) {
        console.log(`Error sending magic link: ${error.message}`);
        throw error;
    }
};

const verifyMagicLink = async (token) => {
    try {
        console.info(`authService: verifyMagicLink for token:${token}`);
        const decoded = jwt.verify(token, config.server.secret);
        if (decoded.type !== 'magicLink') {
            throw new INVALID_TOKEN();
        }
        const jwtToken = jwt.sign({
            email: decoded.email,
            type: 'accessToken',
        }, config.server.secret, {
            expiresIn: 300, // 5 minutes
        });
        return { email: decoded.email, accessToken: jwtToken };
    } catch (error) {
        console.log(`Error verifying magic link: ${error.message}`);
        throw error;
    }
};

module.exports = {
    sendMagicLink,
    verifyMagicLink,
};
