const Joi = require('joi');
const { response_function } = require('../lib/utility/common');
const validate = (validations) => {
  return async (req, res, next) => {
    const errorMessage = [];
    if (validations.length > 0) {
      validations.forEach((validation) => {
        const { schema, property } = validation;
        const { error } = Joi.validate(req[property], schema);
        const valid = error == null;
        if (!valid) {
          const { details } = error;
          const message = details.map((i) => i.message);
          errorMessage.push(message);
        }
      });
    }
    if (errorMessage.length > 0) {
      return res.status(422).send(response_function(422, false, 'VALIDATION_ERROR', errorMessage));
    }

    next();
  };
};

exports.validate = validate;
