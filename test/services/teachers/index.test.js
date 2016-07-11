'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('teachers service', function() {
  it('registered the teachers service', () => {
    assert.ok(app.service('teachers'));
  });
});
