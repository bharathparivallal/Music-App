const passport = require('passport');
const JWT = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const ms = require('ms');
const { APP_STATE } = require('../lib/utility/util_keys');
const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (APP_STATE !== 'local')
    if (err || info || !user) {
      return reject({
        status_code: 401,
        status: false,
        message: 'Please authenticate',
        data: 'Authentication code not matching',
      });
    }
  req.user = user;
  resolve();
};

const auth = async (req, res, next) => {
  try {
    if (req.header('authorization')) {
      const authorizationHeader = req.header('authorization');
      const Token = authorizationHeader.replace('Bearer ', '');
      req.headers.payload = await jwtDecode(Token);
    }
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(
        req,
        res,
        next,
      );
    })
      .then(() => next())
      .catch((err) => res.status(401).send(err));
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
};

/**
 * Generate token
 * @param {string} userId
 * @param {string} expiresIn
 * @param {string} [secret]
 * @returns {string}
 */
function _generateToken({
  email,
  expiresIn = process.env.JWT_ACCESS_DURATION,
  secret = process.env.JWT_SECRET,
}) {
  const payload = {
    email,
  };
  return JWT.sign(payload, secret, { expiresIn });
}

const _getExpiresAtDate = ({ expiresIn = '1h' }) => {
  const inMs = ms(expiresIn);
  return new Date(Date.now() + inMs);
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async ({ email }) => {
  const jwtAccessDuration = process.env.JWT_ACCESS_DURATION;
  const jwtRefreshDuration = process.env.JWT_REFRESH_DURATION;
  const accessToken = _generateToken({ email });
  const refreshToken = _generateToken({
    email,
    expiresIn: jwtRefreshDuration,
    secret: process.env.JWT_REFRESH_SECRET,
  });

  return {
    access: {
      token: accessToken,
      expires: _getExpiresAtDate({ expiresIn: jwtAccessDuration }),
    },
    refresh: {
      token: refreshToken,
      expires: _getExpiresAtDate({ expiresIn: jwtRefreshDuration }),
    },
  };
};

module.exports = { auth, generateAuthTokens };
