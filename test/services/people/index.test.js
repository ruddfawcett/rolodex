'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('people service', function() {
  it('registered the people service', () => {
    assert.ok(app.service('people'));
  });
});
