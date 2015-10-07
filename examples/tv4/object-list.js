#!/usr/bin/env node

var assert = require('assert');
var tv4 = require('tv4');


var schema, validated;

schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      status: {
        enum: [200, 404]
      },
      message: {
        type: 'string'
      },
    },
  },
  minItems: 1
};

validated = tv4.validateMultiple([
  { status: 200, message: 'OK' },
  { status: 404, message: 'Not Found' }
], schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple([
  { status: 404 }
], schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple([
], schema);
assert.strictEqual(validated.errors.length, 1);

validated = tv4.validateMultiple([
  { status: 402 },
  { status: 403 }
], schema);
assert.strictEqual(validated.errors.length, 2);
