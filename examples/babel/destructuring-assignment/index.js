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


//
// 分割代入内で初期値を設定する
//
function useDefault({ x, y = 3 }) {
  return x * y;
}
assert.strictEqual(useDefault({ x: 2}), 6);
assert.strictEqual(useDefault({ x: 2, y: 4}), 8);


//
// 
//
let requirementWithOptions = {
  requirementA: 1,
  requirementB: 2,
  a: 11,
  b: 22,
};
const {
  requirementA,
  requirementB,
  requirementButNotExisted,
  ...options,
} = requirementWithOptions;
assert.strictEqual(requirementA, 1);
assert.strictEqual(requirementB, 2);
assert.strictEqual(requirementButNotExisted, undefined);
assert.deepEqual(options, {
  a: 11,
  b: 22,
});
