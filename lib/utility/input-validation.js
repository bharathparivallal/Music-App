const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req, schema);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details[0].message || 'Pls verify request inputs';
      res.status(422).json({ message });
    }
  };
};

module.exports = { validate };
