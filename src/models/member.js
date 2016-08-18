const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO Edit profile if you've already attended a meetup.

const MemberSchema = new Schema({
  name: { type: String, required: true },
  meetup_id: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  // TODO Ask if they have been to a meetup if this is 0.
  // Only for the first few meetups.
  complete_profile: { type: Boolean, required: false, default: false },
  profile: {
    meetups_attended: { type: Number, required: false, default: 0 },
    teacher: { type: Boolean, required: false },
    affiliation: { type: String, required: false},
    role: { type: String, required: false},
    borough: { type: String, required: false, enum: [
      'MANHATTAN', 'QUEENS', 'STATENISLAND', 'THEBRONX', 'BROOKLYN', 'OUTSIDE',
    ]},
    grade_level: { type: String, required: false, enum: [
      'ELEMENTARY', 'MIDDLE', 'HIGH', 'POSTHIGH'
    ]},
    subjects_taught: { type:[String], enum:[
      'TEST'
    ]}
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
