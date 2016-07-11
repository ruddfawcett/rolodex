'use strict';

const people = require('./people');
const events = require('./events');

const mongoose = require('mongoose');

module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(events);
  app.configure(people);
};
