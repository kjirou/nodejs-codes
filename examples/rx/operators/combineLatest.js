#!/usr/bin/env node


//
// https://twitter.com/armorik83/status/648748525182840832
// ----
// RxJSのthrottle, debounce、なんか思ってる挙動と違って、
// 12345とイベントが短時間に起きたら指定ミリ秒後に1だけ発火する。
// 1が発火して指定ミリ秒間2345無視して欲しい
// ----
//
// をやろうと思ったけどできなかった
//

// タイムアウト回避
setTimeout(function() {
}, 10000);

var Rx = require('rx');

var pauser1 = new Rx.Subject();
pauser1.onNext(false);
var source1 = Rx.Observable
  .interval(1000)
  .pausable(pauser1)
  .map(function (data) {
    console.log(data);
    return data;
  })
;

var pauser2 = new Rx.Subject();
var source2 = Rx.Observable
  .interval(250)
  .pausable(pauser2)
  .map(function (data) {
    console.log(data);
    pauser1.onNext(true);
    pauser2.onNext(false);
    return data;
  })
;

var source = Rx.Observable
  .combineLatest(
    source1,
    source2
  )
  .map(function (source1Data, source2Data) {
    console.log(arguments);
    pauser1.onNext(false);
    pauser2.onNext(true);
    return [source1Data, source2Data];
  })
  .take(100)
;

var subscription = source.subscribe(
  function (x) {
    console.log('Next: %s', x);
  },
  function (err) {
    console.log('Error: %s', err);
  },
  function () {
    console.log('Completed');
  });
