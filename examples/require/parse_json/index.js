#!/usr/bin/env node

var assert = require('assert');


var validData = require('./valid.json');
assert.deepEqual(validData, {
  x: 1,
  y: true
});

assert.throws(function(){
  require('./invalid.json');
}, /Unexpected/);
