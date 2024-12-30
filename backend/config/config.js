const Joi = require('joi');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, "../.env") })

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .default('development'),
    SERVER_PORT: Joi.number()
        .default(4040),
    MONGO_HOST: Joi.string().required()
        .description('Mongo DB host url'),
    MONGO_PORT: Joi.number()
        .default(27017),
    MONGOOSE_DEBUG: Joi.boolean()
        .when('NODE_ENV', {
            is: Joi.string().equal('development'),
            then: Joi.boolean().default(true),
            otherwise: Joi.boolean().default(false)
        }),
}).unknown().required();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    mongo: {
        host: envVars.MONGO_HOST,
        port: envVars.MONGO_PORT
    },
    mongooseDebug: envVars.MONGOOSE_DEBUG,
};

module.exports = config;