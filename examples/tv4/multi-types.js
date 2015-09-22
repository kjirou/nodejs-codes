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
    'string_or_null': {
      type: ['string', 'null']
    }
  }
};

validated = tv4.validateMultiple({
  string_or_null: 'a'
}, schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple({
  string_or_null: null
}, schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple({
  string_or_null: 1
}, schema);
assert.strictEqual(validated.errors.length, 1);


//
// complex multi types
//
schema = {
  type: 'object',
  properties: {
    number_or_object: {
      oneOf: [
        {
          type: 'number',
          minimum: 0
        },
        {
          type: 'object',
          properties: {
            str: {
              type: 'string'
            }
          }
        }
      ]
    }
  }
};

validated = tv4.validateMultiple({
  number_or_object: 1
}, schema);
assert.strictEqual(validated.errors.length, 0);


validated = tv4.validateMultiple({
  number_or_object: {
    str: 'abc'
  }
}, schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple({
  number_or_object: null
}, schema);
assert.strictEqual(validated.errors.length, 1);

validated = tv4.validateMultiple({
  number_or_object: {
    str: 1
  }
}, schema);
assert.strictEqual(validated.errors.length, 1);
