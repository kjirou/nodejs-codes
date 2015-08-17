#!/usr/bin/env node

//
// 以下、pausable 箇所を全部抜くとこうなる
// ここまでは良い
// --------
// source2: 0
// source2: 1
// source2: 2
// source2: 3
// source1: 0
// source2: 4
// source2: 5
// source2: 6
// source2: 7
// source2: 8
// source1: 1
// source2: 9
// source2: 10
// source2: 11
// source2: 12
// source2: 13
// source1: 2
// source2: 14
// ..
// --------
//
// 普通に実行するとこうなる
// source2 が 0 から増えず、増えないのに subscribe が呼ばれている
// --------
// source2: 0
// source1: 0
// source2: 0
// source1: 1
// source2: 0
// source1: 2
// source2: 0
// source1: 3
// source2: 0
// source1: 4
// source2: 0
// ..
// --------
//
// source.resume() が subscribe を起動するのか？
//

var Rx = require('rx');


var source1 = Rx.Observable
  .interval(500)
;
var source2 = Rx.Observable
  .interval(100)
  .pausable()
;


source1.subscribe(
  function(callCount) {
    source2.resume();
    console.log('source1:', callCount);
  },
  function (err) {
    console.log('Error(source1): ' + err);
  }
);
source2.subscribe(
  function(callCount) {
    source2.pause();
    console.log('source2:', callCount);
  },
  function (err) {
    console.log('Error(source2): ' + err);
  }
);

source2.resume();
