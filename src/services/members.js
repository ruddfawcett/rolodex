const hooks = require('feathers-hooks');
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

  app.use('/api/members', service(options));
  const membersService = app.service('/api/members');

  membersService.before({
    find(hook) {
      const query = hook.params.query;
      for (let field in query) {
       if(query[field].$search && field.indexOf('$') == -1) {
         query[field] = {$regex: new RegExp(query[field].$search, 'i')}
       }
      }
      hook.params.query = query
    }
  });
};
