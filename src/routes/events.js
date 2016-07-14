const app = require('../app');
const feathers = require('feathers');
const router = feathers.Router();
const meetup = require('meetup-api')({
  key: app.get('MEETUP_API_KEY')
});

const members = app.service('/api/members');
const events = app.service('/api/events');

router.get('/', function(req, res) {
  var parameters = {
    group_urlname: app.get('MEETUP_GROUP_URL')
  }

  meetup.getEvents(parameters, function(error, response) {
    if (error) {
      res.render('error');
    }

    res.render('events', {
      events: response.results
    });
  });
});

router.get('/:event_id/:event_name', function(req, res) {
  var parameters = {
    event_id: req.params.event_id
  }

  meetup.getRSVPs(parameters, function(error, response) {
    if (error) {
      res.render('error');
    }

      // member_photo =>
// { highres_link: 'http://photos1.meetupstatic.com/photos/member/4/2/6/f/highres_255857007.jpeg',
//   photo_id: 255857007,
//   photo_link: 'http://photos1.meetupstatic.com/photos/member/4/2/6/f/member_255857007.jpeg',
//   thumb_link: 'http://photos1.meetupstatic.com/photos/member/4/2/6/f/thumb_255857007.jpeg' }

  //member =>
  //{ member_id: 203722745, name: 'Tawanta Youngblood' }

    res.render('search');

    member_machine(response['results'], function(members) {
// find in member masterlist
// if not there, add it shallowly
// then add to the attendees with a ref

    });
  });
});

function member_machine(results, callback) {
  var potential = results;

  // members.create({
  //
  // })

  // members.get(1).then(function(member) {
  //   console.log(member.name);
  // });

  callback(members);
}

module.exports = router;
