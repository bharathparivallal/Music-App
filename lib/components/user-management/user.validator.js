const Joi = require('joi');
const authLoginBodySchema = Joi.object()
  .keys({
    body: Joi.object()
      .keys({
        email: Joi.string()
          .trim()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required()
          .error((error) => {
            return error;
          }),
        password: Joi.string()
          .trim()
          .required()
          .error((error) => {
            return error;
          }),
      })
      .unknown(false),
  })
  .unknown(true);

module.exports = {
  authLoginBodySchema,
};
