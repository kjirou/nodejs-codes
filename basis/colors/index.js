#!/usr/bin/env node

var assert = require('assert');
var colors = require('colors');


// 読み込むだけでメソッドが生えるのかを確認する
// ..というか生える、しかも大量に。
assert.strictEqual('abc'.green, '\u001b[32mabc\u001b[39m');
