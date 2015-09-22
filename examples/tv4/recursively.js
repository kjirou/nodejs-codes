#!/usr/bin/env node

//
// Notice:
// checkRecursive option は、渡すデータが再帰している場合の話なので、本件には無関係
// https://github.com/geraintluff/tv4#cyclical-javascript-objects
//

var assert = require('assert');
var tv4 = require('tv4');


var schema, validated;

schema = {
  definitions: {
    foo: {
      type: 'object',
      properties: {
        x: {
          $ref: '#/definitions/foo'
        },
        y: {
          type: 'string'
        }
      },
      required: ['y']
    }
  },
  type: 'object',
  properties: {
    by_ref: {
      $ref: '#/definitions/foo'
    }
  }
};

validated = tv4.validateMultiple({
  by_ref: {
    x: {
      y: 'a'
    },
    y: 'a'
  }
}, schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple({
  by_ref: {
    x: {
      x: {
        x: {
          y: 'a'
        },
        y: 'a'
      },
      y: 'a'
    },
    y: 'a'
  }
}, schema);
assert.strictEqual(validated.errors.length, 0);

validated = tv4.validateMultiple({
  by_ref: {
    x: {
      x: {
        x: {
        },
        y: 'a'
      },
      y: 'a'
    },
    y: 'a'
  }
}, schema);
assert.strictEqual(validated.errors.length, 1);
