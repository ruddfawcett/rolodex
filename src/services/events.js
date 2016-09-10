const service = require('feathers-mongoose');
const hooks = require('feathers-hooks');
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

  app.use('/api/events', service(options));

  const eventsService = app.service('/api/events');
  eventsService.after({
    get: [
      hooks.populate('no', {
        service: '/api/members'
      })
    ]
  });
};
