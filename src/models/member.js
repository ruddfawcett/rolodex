'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO Edit profile if you've already attended a meetup.

// REVIEW how much are we saving here? Should this just be a shell for meetup?
const MemberSchema = new Schema({
  name: { type: String, required: true },
  meetup_id: { type: Number, required: true },
  // TODO Ask if they have been to a meetup if this is 0.
  // Only for the first few meetups.
  profile: {
    meetups_attended: { type: Number, required: true, default: 0 },
    // REVIEW Profession
    // profession: { type: Schema.Types.ObjectId, ref: 'Profession' },
    borough: { type: String, required: true, enum: [
      'MANHATTAN', 'QUEENS', 'STATENISLAND', 'THEBRONX', 'BROOKLYN', 'OUTSIDE',
    ]},
    // if you're a teacher
    grade_level: { type: String, required: true, enum: [
      'ELEMENTARY', 'MIDDLE', 'HIGH', 'POSTHIGH'
    ]},
    // REVIEW Subjects taught
    // subjects_taught: [String],
    // English Language Arts, Math, Science, History/Social Studies, Art/Music, OTHER
  },
  created_at: { type: Date, 'default': Date.now },
  updated_at: { type: Date, 'default': Date.now }
});

MemberSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// MemberSchema.virtual('profile.grade_level').get(function () {
//   switch (enum)
// })

// MemberSchema.virtual('isTeacher').get(function () {
//   return this.profile.profession == "";
// })

const MemberModel = mongoose.model('Member', MemberSchema);

module.exports = MemberModel;
