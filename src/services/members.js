const service = require('feathers-mongoose');
const Member = require('../models/member');

module.exports = function() {
  const app = this;

  const options = {
    Model: Member,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/members', service(options));

  // // Get our initialize service to that we can bind hooks
  // const membersService = app.service('/members');
  //
  // // Set up our before hooks
  // membersService.before(hooks.before);
  //
  // // Set up our after hooks
  // membersService.after(hooks.after);
};
