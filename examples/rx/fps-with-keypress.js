#!/usr/bin/env node

var keypress = require('keypress');
var Rx = require('rx');

//
// 要件:
// 1. timer と keypress を merge する
// 2. 1 frame 内では、最初の 1 keypress だけ有効にする, 同frameの他keypressは破棄
// 3. 別途 timer のみを解釈する subscriber を定義する
//
// Refs:
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/events.md
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/fromeventpattern.md
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/pausable.md
//
// -------
//
// 何故 pausable を使わないかは、他ファイル参照
//

var FPS = 2;

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

var pauser = new Rx.Subject();

var timerSource = Rx.Observable
  .timer(0, 1000 / FPS)
  .timeInterval()
  .map(function(data) {
    // onNext を subscribe 内で行ったら、連打したりするとバグるようになった
    pauser.onNext(true);
    return data;
  })
;

// これだと、(chr, key) の第一引数の chr しか取れない
//var keypressSource = Rx.Observable.fromEvent(process.stdin, 'keypress')
var wrappedHandler;
var keypressSource = Rx.Observable
  .fromEventPattern(
    function addHandler(handler) {
      console.log(process.stdin.listeners.length);  // 常に 1
      wrappedHandler = function(chr, key) {
        handler(key);
      };
      process.stdin.addListener('keypress', wrappedHandler);
    },
    function removeHandelr(handler) {
      process.stdin.removeListener('keypress', wrappedHandler);
      // またはこっちでも
      //process.stdin.removeAllListeners('keypress');
    }
  )
  .pausable(pauser)
  .filter(function() {
    var isStopped = pauser.isStopped;
    pauser.onNext(false);
    return !isStopped;
  })
;


timerSource.subscribe(
  function(data) {
    console.log('Frame count:', data.value);
  }//,
  //function (err) {
  //  console.log('Error(timerSource): ' + err);
  //}
);

keypressSource.subscribe(
  function (key) {
    console.log('Input key:', key.name);
    if (key && key.ctrl && key.name === "c") {
      process.stdin.pause();
      process.exit(0);
    }
  }//,
  //function (err) {
  //  console.log('Error: ' + err);
  //}
);
