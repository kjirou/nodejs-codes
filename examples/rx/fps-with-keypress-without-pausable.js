#!/usr/bin/env node

var keypress = require('keypress');
var Rx = require('rx');

//
// 要件:
// 1. timer と keypress を merge する
// 2. 1 frame 内では、最初の 1 keypress だけ有効にする, 同frameの他keypressは破棄
// 3. 別途 timer のみを解釈する subscriber を定義する
//
// -------
//
// 何故 pausable を使わないかは、他ファイル参照
//
// これだと、いくらキーを叩いても timerSource が止まらない
// ..ただ、これで RxJS を使う意味あるのかは知らんが..
//

var FPS = 2;
var MPF = 1000 / FPS;  // Milliseconds Per Frame?

//
// Copy from:
//   https://raw.githubusercontent.com/Reactive-Extensions/rx-node/master/index.js
//
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

var timerSource = Rx.Observable
  .timer(0, MPF)
  .timeInterval()
;

var isPausedKeypress = false;
var keypressSource = fromStreamForKeypress(process.stdin);


timerSource.subscribe(
  function(timerData) {
    isPausedKeypress = false;
    console.log('Frame count:', timerData.value);
  },
  function (err) {
    console.log('Error(timerSource): ' + err);
  }
);

keypressSource.subscribe(
  function (key) {
    if (!isPausedKeypress) {
      isPausedKeypress = true;
      console.log('Input key:', key.name);
      if (key && key.ctrl && key.name === "c") {
        process.stdin.pause();
        process.exit(0);
      }
    }
  },
  function (err) {
    console.log('Error: ' + err);
  },
  function () {
    console.log('Completed');
  }
);
