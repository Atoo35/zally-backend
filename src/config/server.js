const { Joi } = require('celebrate');

const envVarsSchema = Joi.object({
    SERVER_PORT: Joi.number().required(),
    SERVER_URL: Joi.string().required(),
    SERVER_AUTH_SECRET: Joi.string().required(),
}).unknown(true);

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    server: {
        port: envVars.SERVER_PORT,
        serverUrl: envVars.SERVER_URL,
        secret: envVars.SERVER_AUTH_SECRET,
    },
};

module.exports = config;
