#!/usr/bin/env node

var assert = require('assert');
var Promise = require('bluebird');


var _count = 0;
var createPromise = function(){
  return new Promise(function(resolve){
    _count += 1;
    resolve(_count);
  });
};

var promise = createPromise();
// then により、Promise コンストラクタに渡したコールバックが実行される。
// その中で実行された resolve 関数へ渡した引数を受け取って、
// then に渡したコールバックが実行される。
promise.then(function(count){
  assert.strictEqual(count, 1);
  createPromise().then(function(count){
    assert.strictEqual(count, 2);
    console.log('Script End');
  });
});
