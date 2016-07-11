'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// REVIEW how much are we saving here? Should this just be a shell for meetup?
const PersonSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  meetup_id: { type: String, required: true },
  meetups_attended: { type: Number, required: true, default: 0 },
  // TODO Coordinate with Maor, LA, Cindy, Kelsey about tracking...
  occupation: { type: String, required: true, enum: [
    'EDUCATOR', '...'
  ]},
  created_at: { type: Date, 'default': Date.now },
  updated_at: { type: Date, 'default': Date.now }
});

PersonSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const PersonModel = mongoose.model('Person', PersonSchema);

module.exports = PersonModel;
