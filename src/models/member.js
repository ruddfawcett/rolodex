const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  name: { type: String, required: true },
<<<<<<< HEAD
  email: { type: String },
=======
  email: { type: String, required: true },
>>>>>>> master
  meetup_id: { type: String, required: true, unique: true },
  avatar: { type: String },
  complete_profile: { type: Boolean, default: false },
  profile: {
    affiliation: { type: String },
    role: { type: String },
    borough: { type: String, enum: [
<<<<<<< HEAD
      'MANHATTAN', 'QUEENS', 'STATENISLAND', 'THEBRONX', 'BROOKLYN', 'OUTSIDE', 'CITYWIDE'
=======
      'MANHATTAN', 'QUEENS', 'STATENISLAND', 'THEBRONX', 'BROOKLYN', 'CITYWIDE', 'OUTSIDE'
>>>>>>> master
    ]},
    teacher: { type: Boolean, default: false },
    subjects_taught: {
      english: { type: Boolean },
      mathematics: { type: Boolean },
      science: { type: Boolean },
      social_studies: { type: Boolean },
      foriegn_language: { type: Boolean },
      art: { type: Boolean },
      computer_science: { type: Boolean }
    },
    grade_levels: {
      elementary: { type: Boolean, default: false },
      middle_school: { type: Boolean, default: false },
      high_school: { type: Boolean, default: false },
      post_high: { type: Boolean, default: false }
    }
  },
  created_at: { type: Date, 'default': Date.now },
  updated_at: { type: Date, 'default': Date.now }
});

MemberSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const MemberModel = mongoose.model('Member', MemberSchema);

module.exports = MemberModel;
