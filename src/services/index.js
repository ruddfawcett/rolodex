const members = require('./members');
const meetups = require('./meetups');

const mongoose = require('mongoose');

module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(meetups);
  app.configure(members);
};
