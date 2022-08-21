module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .then(({ statusCode = 200, message = 'DATA RETRIEVED', data = {} }) => {
      const translatedMessage = message;
      res.status(statusCode).send({ message: translatedMessage, data });
    })
    .catch((err) => next(err));
};
