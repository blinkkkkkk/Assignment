const Joi = require('joi');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, "../.env") })

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .default('development'),
    SERVER_PORT: Joi.number()
        .default(4040)
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
};

module.exports = config;