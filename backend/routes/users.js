const express = require('express');
const {
  getUsers,
  getUser,
  getUserById,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');
const {
  getUserValidation,
  updateUserInfoValidation,
  updateAvatarValidation,
} = require('../utils/validation');

const usersRoter = express.Router();

usersRoter.get('/users', getUsers);
usersRoter.get('/users/me', getUserById);
usersRoter.get('/users/:userId', getUserValidation, getUser);
usersRoter.patch('/users/me', updateUserInfoValidation, updateUserInfo);
usersRoter.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = { usersRoter };
