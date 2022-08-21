/**
 * Expose routes
 *
 * @param {Express} app `Express` instance.
 * @api public
 */

const userRoute = require('../components/user-management/user.route');
const songRoute = require('../components/song-management/song.route');
module.exports = function routes(app) {
  const version = { v1: '/api/v1' };
  app.use(version.v1 + '/auth', userRoute);
  app.use(version.v1 + '/song', songRoute);
};
