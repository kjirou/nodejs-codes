#!/usr/bin/env node

var assert = require('assert');
var minimist = require('minimist');


var opts;

// 基本的な使い方、実際は process.argv.slice(2) を渡す
opts = minimist(['arg1', 'arg2', '--bool', '--str', 'abc', '--num', '123', 'arg3']);
assert.deepEqual({
  _: ['arg1', 'arg2', 'arg3'],
  bool: true,
  str: 'abc',
  num: 123
}, opts);

// デフォルト値を指定する
opts = minimist(['--baz', 'not_default'], {
  'default': {
    foo: true,
    bar: 'BAR',
    baz: 'BAZ'
  }
});
assert.deepEqual({
  _: [],
  foo: true,
  bar: 'BAR',
  baz: 'not_default'
}, opts);

// 別名でショートハンドを設定する
opts = minimist(['-f', '-b'], {
  alias: {
    foo: 'f',
    bar: ['bar2', 'b'],
    baz: 'z'
  },
  'default': {
    z: 3
  }
});
assert.deepEqual({
  _: [],
  foo: true,
  f: true,
  bar: true,
  bar2: true,
  b: true,
  // alias 側の z を指定しても両方に反映されている
  baz: 3,
  z: 3
}, opts);

// '--' が有効である
opts = minimist(['-a', '-b', '--', '-c'], {
  // 無効にするには -- オプションを設定する
  //'--': false
});
assert.deepEqual({
  _: ['-c'],
  a: true,
  b: true
}, opts);
