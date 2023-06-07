const jwt = require('jsonwebtoken');

const UNAUTHORIZED_ERROR = require('../errors/unauthorizedError');

// const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UNAUTHORIZED_ERROR('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    throw new UNAUTHORIZED_ERROR('Необходима авторизация');
  }

  req.user = payload;

  return next();
};
