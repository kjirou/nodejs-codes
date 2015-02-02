#!/usr/bin/env node

var assert = require('assert');
var sinon = require('sinon');


obj = {
  foo: function(){ return 1; }
};
assert(obj.foo() === 1);

objMock = sinon.stub(obj, 'foo', function(){ return 2; });
assert(obj.foo() === 2);

objMock.restore();
assert(obj.foo() === 1);

// 二重に restore してもエラーにはならない
objMock.restore();
assert(obj.foo() === 1);
