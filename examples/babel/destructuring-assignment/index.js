#!/usr/bin/env babel-node

import assert from 'assert';


//
// 分割代入内で代入ができる
//
function getObj() {
  return {
    x: 2,
    y: 3
  };
}

let {
  x,
  y,
  z = 6
} = getObj();

assert.strictEqual(x, 2);
assert.strictEqual(y, 3);
assert.strictEqual(z, 6);


//
// 別変数名で展開できる
//
function stringifyObj({ x: xVar, y: yVar }) {
  return xVar + yVar;
}
assert.strictEqual(stringifyObj({ x: 'foo', y: 'bar' }), 'foobar');
