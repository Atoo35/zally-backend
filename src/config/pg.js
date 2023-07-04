const { Joi } = require('celebrate');

const envVarsSchema = Joi.object({
    PG_DATABASE_URL: Joi.string().required(),
    PG_POOL_MAX: Joi.number().required(),
    PG_POOL_MIN: Joi.number().required(),
    PG_POOL_IDLE: Joi.number().required(),
    PG_POOL_ACQUIRE: Joi.number().required(),
    PG_POOL_DIALECT: Joi.string().required(),
}).unknown(true);

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    pg: {
        uri: envVars.PG_DATABASE_URL,
        max: envVars.PG_POOL_MAX,
        min: envVars.PG_POOL_MIN,
        idle: envVars.PG_POOL_IDLE,
        acquire: envVars.PG_POOL_ACQUIRE,
        dialect: envVars.PG_POOL_DIALECT,
    },
};

module.exports = config;
