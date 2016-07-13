const app = require('../app');
const feathers = require('feathers');
const router = feathers.Router();
const meetup = require('meetup-api')({
  key: app.get('MEETUP_API_KEY')
});

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

    member_machine(response, function(members) {

    });

    console.log(response);
  });
});

function member_machine(results, members) {
  var members = [];
}

module.exports = router;
