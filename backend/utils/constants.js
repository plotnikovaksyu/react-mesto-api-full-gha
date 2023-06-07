const correctUrl = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env;

module.exports = { correctUrl, NODE_ENV, JWT_SECRET };
