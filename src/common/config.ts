const { config } = require('dotenv');
const path = require('path');

const options = {
  path: path.join(__dirname, '../../.env')
};

config(options);

module.exports = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  PORT: process.env.PORT,
  ADDRESS: process.env.ADDRESS,
  NODE_ENV: process.env.NODE_ENV,
  SECRET: process.env.SECRET,
  LOGGING_LEVEL: process.env.LOGGING_LEVEL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true'
};
