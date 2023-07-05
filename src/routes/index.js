const { celebrate } = require('celebrate');
const healthController = require('../controllers/healthController');
const authController = require('../controllers/authController');
const { authSchema } = require('../schemas');

module.exports = (app) => {
    app.get('/health', healthController.getHealthStatus);

    app.post('/auth/send-link', celebrate(authSchema.sendMagicLink), authController.sendMagicLink);
    app.get('/auth/verify', celebrate(authSchema.verifyMagicLink), authController.verifyMagicLink);
    app.post('/auth/logout', celebrate(authSchema.logout), authController.logout);
};
