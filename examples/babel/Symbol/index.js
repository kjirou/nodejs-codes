#!/usr/bin/env babel-node

import assert from 'assert';


//
// private-like property
//

var NAME_SYMBOL = Symbol('name');
var AGE_SYMBOL = Symbol('age');

class Person {

  constructor(name, age) {
    this[NAME_SYMBOL] = name;
    this[AGE_SYMBOL] = age;
    this.x = 1;
  }

  get name() {
    return this[NAME_SYMBOL];
  }

  get age() {
    return this[AGE_SYMBOL];
  }
}


let p = new Person('taro', 12);
assert.strictEqual(p.name, 'taro');
assert.strictEqual(p.age, 12);
assert.deepEqual(Object.keys(p), ['x']);  // Not enumerable
