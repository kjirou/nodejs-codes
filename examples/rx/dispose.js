#!/usr/bin/env node

var Rx = require('rx');

//
// 目的:
// 1. sourceを破棄する
//

var source = Rx.Observable
  .timer(0, 500)
  .timeInterval()
;

var sub1 = source.subscribe(
  function(data) {
    console.log('sub1 frames::', data.value);
  },
  function (err) {
    console.log('sub1 error: ' + err);
  },
  function () {
    console.log('sub1 completed');
  }
);

var sub2 = source.subscribe(
  function(data) {
    console.log('sub2 frames::', data.value);
  },
  function (err) {
    console.log('sub2 error: ' + err);
  },
  function () {
    console.log('sub2 completed');
  }
);

//
// 購読者が両名なくなると source が終わり？スクリプトが終了する
//
setTimeout(function() {
  sub1.dispose();
}, 2500);

setTimeout(function() {
  sub2.dispose();
}, 5000);
