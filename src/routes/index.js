const { celebrate } = require('celebrate');
const healthController = require('../controllers/healthController');
const authController = require('../controllers/authController');
const { authSchema } = require('../schemas');

module.exports = (app) => {
    /* Health check endpoint, could be used by load balancers to check the health of
    the server and take it out of rotation if unhealthy */
    app.get('/health', healthController.getHealthStatus);

    /* the 'celebrate' library is used to validate the incoming parameters in the call,
    such as body, query, params etc */

    app.post('/auth/send-link', celebrate(authSchema.sendMagicLink), authController.sendMagicLink);
    app.get('/auth/verify', celebrate(authSchema.verifyMagicLink), authController.verifyMagicLink);

    // used to set the token as inactive in the db
    app.post('/auth/logout', celebrate(authSchema.logout), authController.logout);
};
