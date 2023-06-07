const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  putLikes,
  deleteLikes,
} = require('../controllers/cards');
const {
  createCardValidation,
  deleteCardValidation,
  putLikesValidation,
  deleteLikesValidation,
} = require('../utils/validation');

const cardsRoter = express.Router();

cardsRoter.get('/cards', getCards);
cardsRoter.post('/cards', createCardValidation, createCard);
cardsRoter.delete('/cards/:cardId', deleteCardValidation, deleteCard);
cardsRoter.put('/cards/:cardId/likes', putLikesValidation, putLikes);
cardsRoter.delete('/cards/:cardId/likes', deleteLikesValidation, deleteLikes);

module.exports = { cardsRoter };
