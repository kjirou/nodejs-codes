#!/usr/bin/env node

var assert = require('assert');
var should = require('should');


// eql は == や deepEqual 的な判定
(true).should.eql(1);
[1, 2, 3].should.eql([1, 2, 3]);

// 完全一致は equal や be.exactly
(2).should.equal(2);
('foo').should.be.exactly('foo');
assert.throws(function(){
  ([1, 2]).should.equal([1, 2]);
}, /AssertionError/);
