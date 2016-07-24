#!/usr/bin/env node

'use strict';

//
// これで壊れるような状態になってるように見えるプロジェクトがあるんだけど
// 再現しなかった
//

const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const Baobab = require('baobab');


// Original Class
class Foo {
  constructor(value) {
    this._value = value;
  }
  getValue() {
    return this._value;
  }
}
const foo = new Foo(10);

// Node.js Standard Class
const emitter = new EventEmitter();
emitter.on('hello', () => { console.log('Hello!'); });


const tree = new Baobab({
  foo: foo,
  emitter: emitter,
});

const clonedFoo = tree.get('foo');
assert.strictEqual(foo, clonedFoo);
assert.strictEqual(foo.getValue(), 10);

const clonedEmitter = tree.get('emitter');
assert.strictEqual(emitter, clonedEmitter);
emitter.emit('hello');
clonedEmitter.emit('hello');
