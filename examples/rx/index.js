#!/usr/bin/env node

var Rx = require('rx');
var util = require('util');


//
// Rx.Observable.timer
//   https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/timer.md
//
// Rx.Observable.prototype.pluck(property)
//   https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/pluck.md
//
// Note: Use ".from", if you will pass to static data
//


var args = process.argv.slice(2);
var offset = ~~args[0];
var interval = ~~args[1];
var takes = ~~args[2] || 1;


var source = Rx.Observable.timer(offset, interval)
  .timeInterval()
  //.pluck('interval')
  .take(takes)
;

var subscription = source.subscribe(
  function (x) {
    console.log('Next interval: ' + x.interval);
    console.log('Count: ' + (x.value + 1));
  },
  function (err) {
    console.log('Error: ' + err);
  },
  function () {
    console.log('Completed');
  })
;
