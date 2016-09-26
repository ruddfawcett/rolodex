var socket = io('http://rolodex-csnyc.herokuapp.com');
var app = feathers().configure(feathers.socketio(socket));
var events = app.service('/api/events');
var members = app.service('/api/members');

$('input[name="checkin"]').on('click', function() {
  var affiliation = $('input[name="affiliation"]').val();
  var email = $('input[name="email"]').val();
  var role = $('input[name="role"]').val();
  var borough = $('select[name="borough"]').val();
  var first = $('input[name="first"]').val();
  var last = $('input[name="last"]').val();
  var teacher = $('select[name="teacher"]').val() === 'true' ? true : false;

  if (email.length == 0 || affiliation.length == 0 || role.length == 0 || borough.length == 0 || first.length == 0 || last.length == 0) {
    $('.message').text('Please complete your profile!').fadeIn().delay(2000).fadeOut();
    return;
  }

  var Teacher = {
    $set: {
      complete_profile: true,
      name: first + ' ' + last
    }
  };

  if (teacher) {
    var subjects = {};
    var raw_subjects = $('select[name="subjects"]').val();

    if ($.inArray('ENGLISH', raw_subjects) > -1) {
      subjects.english = true;
    }
    if ($.inArray('MATHEMATICS', raw_subjects) > -1) {
      subjects.mathematics = true;
    }
    if ($.inArray('SCIENCE', raw_subjects) > -1) {
      subjects.science = true;
    }
    if ($.inArray('SOCIALSTUDIES', raw_subjects) > -1) {
      subjects.social_studies = true;
    }
    if ($.inArray('FOREIGNLANGUAGE', raw_subjects) > -1) {
      subjects.foriegn_language = true;
    }
    if ($.inArray('ART', raw_subjects) > -1) {
      subjects.art = true;
    }
    if ($.inArray('COMPUTERSCIENCE', raw_subjects) > -1) {
      subjects.computer_science = true;
    }

    var grades = {};
    var raw_grades = $('select[name="grades"]').val();
    if ($.inArray('ELEMENTARY', raw_grades) > -1) {
      grades.elementary = true;
    }
    if ($.inArray('MIDDLE', raw_grades) > -1) {
      grades.middle_school = true;
    }
    if ($.inArray('HIGH', raw_grades) > -1) {
      grades.high_school = true;
    }
    if ($.inArray('POSTHIGH', raw_grades) > -1) {
      grades.post_high = true;
    }

    Teacher.$set.profile = {
      teacher: true,
      subjects_taught: subjects,
      grade_levels: grades
    }

    if (subjects.length == 0 || grades.length == 0) {
      $('.message').text('Please choose subjects or grades!').fadeIn().delay(2000).fadeOut();
      return;
    }
  }

  Teacher.$set.profile = {
    affiliation: affiliation,
    role: role,
    borough: borough
  }

  members.update(member_id, Teacher).then(function(result) {
    if (result) {
      window.location.reload();
    }
    else {
      console.log('error');
    }
  }).catch(function(error) {
    console.log('error');
    console.log(error);
  });
});
