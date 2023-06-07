const jwt = require('jsonwebtoken');

const UNAUTHORIZED_ERROR = require('../errors/unauthorizedError');
// const UNAUTHORIZED_ERROR = 401;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    // return res.status(UNAUTHORIZED_ERROR).send({ message: 'Необходима авторизация' });
    return next(new UNAUTHORIZED_ERROR('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // return res.status(UNAUTHORIZED_ERROR).send({ message: 'Необходима авторизация' });
    throw new UNAUTHORIZED_ERROR('Необходима авторизация');
  }

  req.user = payload;

  return next();
};
