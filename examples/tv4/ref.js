#!/usr/bin/env node

var assert = require('assert');
var tv4 = require('tv4');


var schema, validated;

schema = {
  definitions: {
    string_or_null: {
      type: ['string', 'null']
    }
  },
  type: 'object',
  properties: {
    'by_ref': {
      $ref: '#/definitions/string_or_null'
    }
  }
};

validated = tv4.validateMultiple({
  by_ref: 'a'
}, schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple({
  by_ref: null
}, schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple({
  by_ref: 1
}, schema);
assert.strictEqual(validated.errors.length, 1);
