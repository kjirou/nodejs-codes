#!/usr/bin/env node

'use strict';

const assert = require('assert');
const Baobab = require('baobab');


class Foo {
  func() {
  }
}

const tree = new Baobab({
  func() {
  },
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
assert.deepStrictEqual(tree.get(['party', 'members', '1']), {
  name: 'Hanako',
  job: 'mage',
});

tree.push(['party', 'members'], {
  name: 'Jiro',
  job: 'thief',
});
assert.deepStrictEqual(tree.get(['party', 'members', '2']), {
  name: 'Jiro',
  job: 'thief',
});


//
// Does it not broken unrelated refs?
//
const taro = tree.get(['party', 'members', '0']);
assert.deepStrictEqual(taro, {
  name: 'Taro',
  job: 'fighter',
});

tree.unshift(['party', 'members'], {
  name: 'Hiroshi',
  job: 'ranger',
});

const taro2 = tree.get(['party', 'members', '1']);
assert.strictEqual(taro, taro2);


//
// Get data as a different ref after update
//
const state1 = tree.get();
const state2 = tree.get();

assert.strictEqual(state1, state2);

tree.set('money', 1001);

const state3 = tree.get();

assert.notStrictEqual(state1, state3);


console.log(tree.get());
