const service = require('feathers-mongoose');
const Event = require('../models/event');

module.exports = function() {
  const app = this;

  const options = {
    Model: Event,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/events', service(options));

  // // Get our initialize service to that we can bind hooks
  // const eventsService = app.service('/events');
  //
  // // Set up our before hooks
  // eventsService.before(hooks.before);
  //
  // // Set up our after hooks
  // eventsService.after(hooks.after);
};
