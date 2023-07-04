const { Joi } = require('celebrate');

const envVarsSchema = Joi.object({
    EMAIL_USERNAME: Joi.string().required(),
    EMAIL_PASSWORD: Joi.string().required(),
    EMAIL_PORT: Joi.string().required(),
}).unknown(true);

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    email: {
        username: envVars.EMAIL_USERNAME,
        password: envVars.EMAIL_PASSWORD,
        port: envVars.EMAIL_PORT,
    },
};

module.exports = config;
