#!/usr/bin/env node

//
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/throttle.md
//

var Rx = require('rx');


// この source は 1000 ms 間隔で発火するようになる
// その中で発生したイベントの最初のものを返す
//
// FPS処理の場合、throttle 内で指定している値を、別の timerSource の発火タイミングにしないといけない
// ここみると http://qiita.com/erukiti/items/6a82dfd3506e9773d592
// .buffer との組み合わせでどうにかできそうだけど、時間かかりそうなので保留
//
var source = Rx.Observable
  .interval(300)
  .timeInterval()
  .throttle(1000)
;
source.subscribe(
  function(data) {
    console.log(data);
  },
  function (err) {
    console.error('Error:', err);
  }
);


//var timerSource = Rx.Observable
//  .timer(0, 1000)
//  .timeInterval()
//  .throttle(1500)
//;
//timerSource.subscribe(
//  function(data) {
//    console.log(data);
//  },
//  function (err) {
//    console.error('Error:', err);
//  }
//);


// 以下、ドキュメントの例だと
//
// => Next: 0
// => Next: 2
// => Next: 3
// => Completed
//
// となるらしいが、実際は
//
// => Next: 3
//
// だけになった
//
//var times = [
//  { value: 0, time: 100 },
//  { value: 1, time: 600 },
//  { value: 2, time: 400 },
//  { value: 3, time: 900 },
//  { value: 4, time: 200 }
//];
//
//// Delay each item by time and project value;
//var source = Rx.Observable.from(times)
//  .flatMap(function (item) {
//    console.log(item);
//    return Rx.Observable
//      .of(item.value)
//      .delay(item.time);
//  })
//  .throttle(300 /* ms */);
//
//var subscription = source.subscribe(
//  function (x) {
//    console.log('Next: %s', x);
//  },
//  function (err) {
//    console.log('Error: %s', err);
//  },
//  function () {
//    console.log('Completed');
//  });
