const pino = require('pino');

const appEnv = process.env.NODE_ENV;
const logLevel = process.env.PINO_LOG_LEVEL;

const logger = pino({
  name: `PBP-${appEnv}`,
  level: logLevel || 'info',
  prettyPrint: process.env.PINO_PRETTY_PRINT || false,
});

module.exports = logger;
