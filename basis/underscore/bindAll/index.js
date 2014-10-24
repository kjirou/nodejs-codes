#!/usr/bin/env node

var assert = require('assert');
var _ = require('underscore');


//
// _.bindAll の第2引数は省略できない。
//
// 多分、1.5 から。
//
var obj = {
  foo: 1,
  bar: 2
};
assert.throws(function(){
  _.bindAll(obj);
}, /bindAll must be passed function names/);
