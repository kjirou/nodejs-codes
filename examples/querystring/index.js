#!/usr/bin/env node


var querystring = require('querystring');
var assert = require('assert');


//
// parse の基本的な例
//
var result = querystring.parse('x=1&y=2&z=3');
assert(result.x === '1');
assert(result.y === '2');
assert(result.z === '3');


//
// 重複したキーがある場合どうなるのか
//
var result = querystring.parse('x=1&y=2&y=3');
assert(result.x === '1');
assert(result.y[0] === '2');  // y:['2', '3'] になる
assert(result.y[1] === '3');
