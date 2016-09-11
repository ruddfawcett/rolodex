const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  meetup_id: { type: String, required: true },
  attendees: {
    all: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    yes: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    no: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    waitlist: [{ type: Schema.Types.ObjectId, ref: 'Member' }]
  },
  created_at: { type: Date, 'default': Date.now },
  updated_at: { type: Date, 'default': Date.now }
});

EventSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const EventModel = mongoose.model('Event', EventSchema);

module.exports = EventModel;
