#!/usr/bin/env node

var assert = require('assert');
var tv4 = require('tv4');


var schema, validated;

schema = {
  type: 'array',
  items: {
    type: 'number',
  },
  minItems: 3,
  maxItems: 4
};

validated = tv4.validateMultiple([1, 2, 3], schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple([1, 2, 3, 4], schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple([1, 2, 3, 4, 5], schema);
assert.strictEqual(validated.errors.length, 1);

validated = tv4.validateMultiple([1, 2], schema);
assert.strictEqual(validated.errors.length, 1);
