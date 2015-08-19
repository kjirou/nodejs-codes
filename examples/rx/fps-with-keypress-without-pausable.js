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
var MPF = 1000 / FPS;  // Milliseconds Per Frame?

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

//var isPausedKeypress = false;
var pauser = new Rx.Subject();

var timerSource = Rx.Observable
  .timer(0, MPF)
  .timeInterval()
  .map(function(data) {
    // onNext を subscribe 内で行ったら、連打したりするとバグるようになった
    pauser.onNext(true);
    return data;
  })
;

// これだと、(chr, key) の第一引数の chr しか取れない
//var keypressSource = Rx.Observable.fromEvent(process.stdin, 'keypress')
var handlerKeeping;
var keypressSource = Rx.Observable
  .fromEventPattern(
    function addHandler(handler) {
      console.log(process.stdin.listeners.length);  // 常に 1
      handlerKeeping = function(chr, key) {
        handler(key);
      };
      process.stdin.addListener('keypress', keptHandler);
    },
    function removeHandelr(handler) {
      process.stdin.removeListener('keypress', handlerKeeping);
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
  function(timerData) {
    console.log('Frame count:', timerData.value);
  },
  function (err) {
    console.log('Error(timerSource): ' + err);
  }
);

keypressSource.subscribe(
  function (key) {
    console.log('Input key:', key.name);
    if (key && key.ctrl && key.name === "c" || key === "q") {
      process.stdin.pause();
      process.exit(0);
    }
  },
  function (err) {
    console.log('Error: ' + err);
  },
  function () {
    console.log('Completed');
  }
);
