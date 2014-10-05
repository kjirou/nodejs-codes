#!/usr/bin/env node

var async = require('async');


//
// イテレーション内でランタイムエラーが発生した場合、
// 暗黙的にキャッチしてくれないことを確認する
//
// 
//
values = [1, 2, 3];
async.eachSeries(values, function(value, nextLoop){
  if (value === 2) {
    throw new Error('Runtime Error');
  }
  setTimeout(function(){
    nextLoop();
  }, 1);
}, function(err){
});

setTimeout(function(){
  // ここが実行されない
  console.log('setTimeout:50');
}, 50);

console.log('Finish setting events.');
