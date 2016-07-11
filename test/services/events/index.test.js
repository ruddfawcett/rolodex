'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('events service', function() {
  it('registered the events service', () => {
    assert.ok(app.service('events'));
  });
});
