const { celebrate, Joi } = require('celebrate');
const { correctUrl } = require('./constants');

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(correctUrl),
  }),
});

const deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

const putLikesValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

const deleteLikesValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

const getUserValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(correctUrl),
  }),
});

module.exports = {
  createCardValidation,
  deleteCardValidation,
  putLikesValidation,
  deleteLikesValidation,
  getUserValidation,
  updateUserInfoValidation,
  updateAvatarValidation,
};
