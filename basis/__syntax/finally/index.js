#!/usr/bin/env node

var assert = require('assert');


executedFinally = false

assert.throws(function(){
  try {
    require('not_existed_module')
  } catch (e) {
    throw e
  } finally {
    executedFinally = true
  }
}, function(e){
  if (
    e instanceof Error &&
    /not_existed_module/.test(e.message) &&
    executedFinally
  ) {
    return true;
  }
});
