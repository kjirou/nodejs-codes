#!/usr/bin/env node

'use strict';

const assert = require('assert');
const StateTree = require('state-tree');


class Foo {
  func() {
  }
}

const tree = StateTree({
  // Can not pass functions directly
  //func() {
  //},
  fame: 10,
  foo: new Foo(),
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


//
// Flushing changes
//
tree.set('fame', 101);  // another value
tree.set('money', 1000);  // same value
assert.deepStrictEqual(tree.flushChanges(), {
  fame: true,
  money: true,  // true!
  party: {
    members: {
      0: true,  // Unshifted "Hiroshi"
      2: true,  // Pushed "Jiro" before "Hiroshi", (current index is 3)
    },
  },
});

// Reset changes
assert.deepStrictEqual(tree.flushChanges(), {});

tree.push('party.members', {
  name: 'Goro',
  job: 'knight',
});
tree.set('party.members.1.job', 'lord');

assert.deepStrictEqual(tree.flushChanges(), {
  party: {
    members: {
      1: {
        job: true,
      },
      4: true,
    },
  },
});


console.log(tree.get(''));
