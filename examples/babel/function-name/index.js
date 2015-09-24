#!/usr/bin/env babel-node

import assert from 'assert';


function foo() {
}

let bar = function() {
};

const baz = function() {
};

assert.strictEqual(foo.name, 'foo');
assert.strictEqual(bar.name, 'bar');
assert.strictEqual(baz.name, 'baz');


let hoge = () => {
};

const hige = () => {
};

assert.strictEqual(hoge.name, 'hoge');
assert.strictEqual(hige.name, 'hige');


const obj = {
  x: function() {
  },
  y() {
  },
  z: () => {
  },
};

assert.strictEqual(obj.x.name, 'x');
assert.strictEqual(obj.y.name, 'y');
assert.strictEqual(obj.z.name, 'z');
