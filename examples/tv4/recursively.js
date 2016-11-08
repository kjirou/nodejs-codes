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


//
// [{ children: [] }] の再帰
//

var schema2 = {
  definitions: {
    children: {
      type: 'array',
      items: {
        type: 'object',
        required: [
          'name',
          'children',
        ],
        properties: {
          name: {
            type: 'string',
          },
          children: {
            $ref: '#/definitions/children'
          },
        },
      },
    },
  },
  $ref: '#/definitions/children'
};

var validated2;

validated2 = tv4.validateMultiple([
  {
    name: 'oya',
    children: [],
  },
], schema2);
assert.strictEqual(validated2.errors.length, 0);

validated2 = tv4.validateMultiple([
  {
    name: 'oya',
    children: [
      {
        name: 'ko1',
        children: [
          {
            name: 'mago',
            children: [],
          }
        ],
      },
      {
        name: 'ko2',
        children: [],
      },
    ],
  },
], schema2);
assert.strictEqual(validated2.errors.length, 0);

validated2 = tv4.validateMultiple([
  {
    name: 'oya',
    children: [
      {
        name: 'ko1',
        children: [
          {
            children: [],
          }
        ],
      },
      {
        name: 'ko2',
        children: [],
      },
    ],
  },
], schema2);
assert.strictEqual(validated2.errors.length, 1);
