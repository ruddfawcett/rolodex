'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  meetup_id: { type: Number, required: true },
  venue: {
    // TODO fill out
  },
  attendees: [{
    person: { type: Schema.Types.ObjectId, ref: 'Member' },
    checked_in: { type: Boolean, required: true, default: false }
  }],
  created_at: { type: Date, 'default': Date.now },
  updated_at: { type: Date, 'default': Date.now }
});

EventSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const EventModel = mongoose.model('Event', EventSchema);

module.exports = EventModel;
