const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  meetup_id: { type: Number, required: true },
  // TODO venue: {},
  attendees: [{
    member: { type: Schema.Types.ObjectId, ref: 'Member' },
    checked_in: { type: Boolean, required: true, default: false },
    photo: { type: String, required: false }
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
