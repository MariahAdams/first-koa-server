const connection = require('mongoose').connection;
const state = require('mongoose/lib/connectionstate');
const { HttpError } = require('./error-handler');

module.exports = (req, res, next) => {
  const readyState = connection.readyState;
  if(readyState === state.connected || readyState === state.connecting) {
    next();
  } else {
    next(new HttpError(500, 'Can not connect to mongoDB'));
  }
};