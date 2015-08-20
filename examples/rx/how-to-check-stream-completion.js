#!/usr/bin/env node

var Rx = require('rx');

//
// 目的:
//
// 1. source の完了/非完了の状態を取りたい
//

var source = Rx.Observable
  .timer(0, 500)
  .timeInterval()
  .take(5)
;

var sub1 = source.subscribe(
  function(data) {
    console.log(data.value);
  },
  function (err) {
    console.log('Error:' + err);
  },
  function () {
    console.log('Completed');
  }
);

setTimeout(function() {
  // source.何使えばいいの？
}, 2500);
