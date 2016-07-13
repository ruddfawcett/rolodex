const service = require('feathers-mongoose');
const EvMeetupent = require('../models/meetup');

module.exports = function() {
  const app = this;

  const options = {
    Model: Meetup,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/meetups', service(options));

  // // Get our initialize service to that we can bind hooks
  // const meetupsService = app.service('/meetups');
  //
  // // Set up our before hooks
  // meetupsService.before(hooks.before);
  //
  // // Set up our after hooks
  // meetupsService.after(hooks.after);
};
