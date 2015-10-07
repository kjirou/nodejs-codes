#!/usr/bin/env node

var assert = require('assert');
var tv4 = require('tv4');


var schema, validated;

//
// simple multi types
//
schema = {
  type: 'object',
  properties: {
    enumerated: {
      enum: ['foo', 'bar', 1, 2, null]
    }
  }
};

validated = tv4.validateMultiple({
  enumerated: 'foo'
}, schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple({
  enumerated: 1
}, schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple({
  enumerated: null
}, schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple({
  enumerated: {}
}, schema);
assert.strictEqual(validated.errors.length, 1);
