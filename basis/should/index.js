#!/usr/bin/env node

var assert = require('assert');
var should = require('should');


//
// eql は deepEqual 的な判定
//
// ただ、判定は参照一致ではないけど自動キャストはしなくなった
// つまり、true と 1 は一致しない。これは 4.1-4.3 の間の何処かで変わった
//
(true).should.eql(true);
assert.throws(function(){
  (true).should.eql(1);
}, /AssertionError/);
(NaN).should.eql(NaN);
[1, 2, 3].should.eql([1, 2, 3]);
('foo').should.eql('foo');
assert.throws(function(){
  ('foo').should.eql('bar');
}, /AssertionError/);


//
// 完全一致は equal や be.exactly
//
(2).should.equal(2);
('foo').should.be.exactly('foo');
assert.throws(function(){
  ([1, 2]).should.equal([1, 2]);
}, /AssertionError/);
