#!/usr/bin/env node

var keypress = require('keypress');
var Rx = require('rx');
var util = require('util');


//
// Rx.Observable.timer
//   https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/timer.md
//
// Rx.Observable.fromNodeCallback
//  https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/fromnodecallback.md
//

var FPS = 30;
var MPF = 1000 / FPS;  // Milliseconds Per Frame?

var timerSource = Rx.Observable
  .timer(0, MPF)
  .timeInterval()
;

keypress(process.stdin);

//
// 一回で Completed になってしまう理由が皆目検討付かない
//
// 対応案：
// 1. ちゃんと勉強する（コストに見合わない）
// 2. 誰かに聞く（聞く人が居ない）
// 3. https://github.com/Reactive-Extensions/rx-node の fromStream を使って
//    keypress 解析は keypress から持ってくる
// 4. fromStream を改変して keypress を見るようにする
//
// ----
//
// 後、コールバックの第一引数が潰されている
// (ch, key) なのに key の情報が ch に入ってる
//
// ----
//
// とりあえずこのファイルはこのままで別でやる なのに key の情報が ch に入ってるch, key
//

//var onStdin = Rx.Observable.fromNodeCallback(process.stdin.on.bind(process.stdin));
var onStdin = Rx.Observable.fromCallback(process.stdin.on.bind(process.stdin));
var keypressSource = onStdin('keypress')
  //.take(99)
  //.publish()
  //.refCount()
;


var subscription = keypressSource.subscribe(
  function (ch, key) {
    console.log(arguments);
  },
  function (err) {
    console.log('Error: ' + err);
  },
  function () {
    console.log('Completed');
  })
;


//var subscription = timerSource.subscribe(
//  function (x) {
//    console.log('Next interval: ' + x.interval);
//    console.log('Count: ' + (x.value + 1));
//  },
//  function (err) {
//    console.log('Error: ' + err);
//  },
//  function () {
//    console.log('Completed');
//  })
//;

process.stdin.setRawMode(true);
process.stdin.resume();
