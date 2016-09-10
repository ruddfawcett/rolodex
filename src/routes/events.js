const app = require('../app');
const router = require('feathers').Router();
const async = require('async');
const meetup = require('meetup-api')({
  key: app.get('MEETUP_API_KEY')
});
const importer = require('../modules/import');

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


router.get('/:event_id', (req, res) => {
  importer.findEvent(app, req.params.event_id).then(importer.loadMembers).then(importer.addMembers).then((meeting) => {
    res.render('search', {
      event: meeting
    });
  }).catch((error) => {
    res.send(error);
  })
});

module.exports = router;
