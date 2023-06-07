const router = require('express').Router();
const auth = require('../middleware/auth');
const { usersRoter } = require('./users');
const { cardsRoter } = require('./cards');
const { createUser, login } = require('../controllers/users');
const {
  createUserValidation,
  loginValidation,
} = require('../utils/validation');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);

router.use(auth);
router.use(usersRoter);
router.use(cardsRoter);

module.exports = { router };
