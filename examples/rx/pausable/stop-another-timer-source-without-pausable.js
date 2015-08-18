#!/usr/bin/env node

var Rx = require('rx');


var source1 = Rx.Observable
  .interval(500)
;
var source2 = Rx.Observable
  .interval(100)
;


var isSource2Paused = false;

source1.subscribe(
  function(callCount) {
    isSource2Paused = false;
    console.log('source1:', callCount);
  },
  function (err) {
    console.log('Error(source1): ' + err);
  }
);
source2.subscribe(
  function(callCount) {
    if (isSource2Paused) {
      return;
    }
    isSource2Paused = true;
    console.log('source2:', callCount);
  },
  function (err) {
    console.log('Error(source2): ' + err);
  }
);
