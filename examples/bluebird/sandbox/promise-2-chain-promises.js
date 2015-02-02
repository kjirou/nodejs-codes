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


//
// $.Deferred で言うところの以下の様なの:
//
// var step = function(){
//   var dfd = new $.Deferred();
//   createPromise().then(function(count){
//     dfd.resolve(count);
//   });
//   return dfd.promise();
// };
//
var step = function(){
  // しかしこれ、promise 生成時に処理を渡すことが必須なのがやりにくい。
  // 何か方法ないか？
  return new Promise(function(resolve){
    createPromise().then(function(count){
      resolve(count);
    });
  });
};


step().then(function(count){
  assert.strictEqual(count, 1);
  return step();
}).then(function(count){
  assert.strictEqual(count, 2);
  return step();
}).then(function(count){
  assert.strictEqual(count, 3);
  console.log('Script End');
});
