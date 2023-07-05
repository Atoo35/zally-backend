const { Joi } = require('celebrate');

const sendMagicLink = {
    body: Joi.object({
        email: Joi.string().regex(/^(.+)@(.+)$/).required(),
    }),
};

const verifyMagicLink = {
    query: Joi.object({
        token: Joi.string().required(),
    }),
};

const logout = {
    body: Joi.object({
        email: Joi.string().regex(/^(.+)@(.+)$/).required(),
    }),
};

module.exports = {
    sendMagicLink,
    verifyMagicLink,
    logout,
};
