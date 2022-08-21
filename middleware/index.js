const { auth: authMiddleware } = require('./auth.middleware');
const { apiLimiter } = require('./rate-limiter.middleware');

module.exports = {
  authMiddleware,
  apiLimiter,
};
