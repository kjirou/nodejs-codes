#!/usr/bin/env node

//
// setTimeout 内でランタイムエラーが発生した場合、
// 他の setTimeout や setInterval で設定したイベント群は実行されずに終了することの確認
//
// node-v0.10.32
//

setTimeout(function(){
  throw new Error('setTimeout:1');
}, 1);

setInterval(function(){
  throw new Error('setInterval:10');
}, 10);

setTimeout(function(){
  throw new Error('setTimeout:10');
}, 10);

setTimeout(function(){
  throw new Error('setTimeout:100');
}, 100);

setTimeout(function(){
  throw new Error('setTimeout:1000');
}, 1000);

console.log('Finish setting events.');
