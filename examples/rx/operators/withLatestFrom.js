#!/usr/bin/env node

var Rx = require('rx');


/* Have staggering intervals */
var source1 = Rx.Observable.interval(140)
    .map(function (i) { return 'First: ' + i; });

var source2 = Rx.Observable.interval(50)
    .map(function (i) { return 'Second: ' + i; });

// When source1 emits a value, combine it with the latest emission from source2.
//
// First が発火したときに、古い中で最新の Second を拾う
var source = source1.withLatestFrom(
    source2,
    function (s1, s2) { return s1 + ', ' + s2; }
).take(4);

var subscription = source.subscribe(
    function (x) {
        console.log('Next: ' + x.toString());
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });

// => Next: First: 0, Second: 1 =>  First: 140ms, Second: 100ms
// => Next: First: 1, Second: 4 =>  First: 280ms, Second: 250ms
// => Next: First: 2, Second: 7
// => Next: First: 3, Second: 10
// => Completed

