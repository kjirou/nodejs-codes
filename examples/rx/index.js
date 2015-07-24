#!/usr/bin/env node

var Rx = require('rx');


//
// Rx.Observable.timer
//   https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/timer.md
//


var source = Rx.Observable.timer(200, 100)
  .timeInterval()
  .pluck('interval')
  .take(3)
;

var subscription = source.subscribe(
  function (x) {
    console.log('Next: ' + x);
  },
  function (err) {
    console.log('Error: ' + err);
  },
  function () {
    console.log('Completed');
  })
;
