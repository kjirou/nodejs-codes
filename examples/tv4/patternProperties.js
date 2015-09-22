#!/usr/bin/env node

var assert = require('assert');
var tv4 = require('tv4');


var schema, validated;

//
// Any key
//
schema = {
  type: 'object',
  patternProperties: {
    "": {
      type: 'string'
    }
  }
};

validated = tv4.validateMultiple({
  foo: 'a',
  bar: 'b'
}, schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple({
  foo: 1,
  bar: 'b'
}, schema);
assert.strictEqual(validated.errors.length, 1);


//
// Match as RegExp
//
schema = {
  type: 'object',
  patternProperties: {
    "^b": {
      type: 'string'
    }
  }
};

validated = tv4.validateMultiple({
  foo: 'a',
  bar: 'b'
}, schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple({
  foo: 1,
  bar: 'b'
}, schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple({
  foo: 1,
  bar: 0,
  baz: null
}, schema);
assert.strictEqual(validated.errors.length, 2);
