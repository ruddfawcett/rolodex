const app = require('../app');
const router = require('feathers').Router();
const meetup = require('meetup-api')({
  key: app.get('MEETUP_API_KEY')
});
const async = require('async');

const members = app.service('/api/members');
const events = app.service('/api/events');

router.get('/', (req, res) => {
  var parameters = {
    group_urlname: app.get('MEETUP_GROUP_URL')
  }

  meetup.getEvents(parameters, (error, response) => {
    if (error) res.render('error');

    res.render('events', {
      events: response.results.slice(0, 15)
    });
  });
});

router.get('/:event_id', (req, res) => { // /:event_name
  var parameters = {
    event_id: req.params.event_id
  }

  meetup.getRSVPs(parameters, (error, response) => {
    if (error) res.render('error');

    async.each(response['results'], (rsvp) => {
      var Member = {
        name: rsvp.member.name,
        meetup_id: rsvp.member.member_id
      };

      if (typeof rsvp.member_photo !== 'undefined') {
        Member.avatar = rsvp.member_photo.photo_link;
      }

      return members.create(Member);
    });

    res.render('search');
  });
});

module.exports = router;
