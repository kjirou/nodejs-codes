#!/usr/bin/env node

var keypress = require('keypress');
var Rx = require('rx');

//
// 一応できたver
//

//
// Copy from:
//   https://raw.githubusercontent.com/Reactive-Extensions/rx-node/master/index.js
//
var fromStream = function (stream, finishEventName) {
  stream.pause();

  finishEventName || (finishEventName = 'end');

  return Rx.Observable.create(function (observer) {
    function dataHandler (data) {
      observer.onNext(data);
    }

    function errorHandler (err) {
      observer.onError(err);
    }

    function endHandler () {
      observer.onCompleted();
    }

    stream.addListener('data', dataHandler);
    stream.addListener('error', errorHandler);
    stream.addListener(finishEventName, endHandler);

    stream.resume();

    return function () {
      stream.removeListener('data', dataHandler);
      stream.removeListener('error', errorHandler);
      stream.removeListener(finishEventName, endHandler);
    };
  }).publish().refCount();
};

var fromStreamForKeypress = function (stream, finishEventName) {
  stream.pause();

  finishEventName || (finishEventName = 'end');

  return Rx.Observable.create(function (observer) {
    function dataHandler (chr, key) {
      // 引数はひとつしか送れないみたい
      observer.onNext(key);
    }

    function errorHandler (err) {
      observer.onError(err);
    }

    function endHandler () {
      observer.onCompleted();
    }

    stream.addListener('keypress', dataHandler);
    stream.addListener('error', errorHandler);
    stream.addListener(finishEventName, endHandler);

    stream.resume();

    return function () {
      stream.removeListener('keypress', dataHandler);
      stream.removeListener('error', errorHandler);
      stream.removeListener(finishEventName, endHandler);
    };
  }).publish().refCount();
};

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

var source = fromStreamForKeypress(process.stdin);

var subscription = source.subscribe(
  function (key) {
    console.log(arguments);
    if (key && key.ctrl && key.name === "c") {
      process.stdin.pause();
    }
  },
  function (err) {
    console.log('Error: ' + err);
  },
  function () {
    console.log('Completed');
  })
;
