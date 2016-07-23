#!/usr/bin/env node

'use strict';

const assert = require('assert');
const StateTree = require('state-tree');


class Foo {}

const tree = StateTree({
  // Can not pass functions
  //func() {
  //},
  instance: new Foo(),
  money: 1000,
  party: {
    members: [
      {
        name: 'Taro',
        job: 'fighter',
      },
      {
        name: 'Hanako',
        job: 'mage',
      },
    ],
  },
});

assert.strictEqual(tree.get('money'), 1000);
assert.deepStrictEqual(tree.get('party.members.1'), {
  name: 'Hanako',
  job: 'mage',
});

tree.push('party.members', {
  name: 'Jiro',
  job: 'thief',
});
assert.deepStrictEqual(tree.get('party.members.2'), {
  name: 'Jiro',
  job: 'thief',
});


//
// Does it not broken unrelated refs?
//
const taro = tree.get('party.members.0');
assert.deepStrictEqual(taro, {
  name: 'Taro',
  job: 'fighter',
});

tree.unshift('party.members', {
  name: 'Hiroshi',
  job: 'ranger',
});

const taro2 = tree.get('party.members.1');
assert.strictEqual(taro, taro2);


const tree2 = tree.get('');
console.log(tree2);
