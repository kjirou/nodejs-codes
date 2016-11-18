#!/usr/bin/env node

const EventEmitter = require('events').EventEmitter;

const Rx = require('rxjs/Rx');

//
// TODO: エラーが発生したら後続のイベントはキャンセルする（キューに残ってるイベントは消化する
// TODO: toPromise の使い方がわからない
//

class MyEventEmitter extends EventEmitter {
}

const emitter = new MyEventEmitter();


let source;

//
// fromEvent だと 'event1' しか listen できない
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/fromeventpattern.md
//
//source = Rx.Observable.fromEvent(emitter, 'event1');
source = Rx.Observable.fromEventPattern((rxCallback) => {
  emitter.on('event1', rxCallback);
  emitter.on('event2', rxCallback);
});

source
  .concatMap(payload => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (payload.error) {
          reject(payload.error);
        } else {
          resolve(payload);
        }
      }, payload.waitTime);
    });
    return Rx.Observable.fromPromise(promise);
  })
;


let subscription = source
  .subscribe(
    // success
    (payload) => {
      console.log('success:', payload);
    },
    // error
    (payload) => {
      console.log('error:', payload);
    },
    // TODO: 何か実行されないけどいいや
    // completed
    () => {
      console.log('completed');
    }
  )
  // 以下は動かない)
  //.toPromise()
  //.then(payload => console.log('success:', payload))
  //.catch(payload => console.error('error:', payload))
;


// 登録順で、常に 1 処理だけ、実行される
emitter.emit('event1', { waitTime: 100 });
emitter.emit('event1', { waitTime: 500 });
emitter.emit('event2', { waitTime: 201 });
emitter.emit('event1', { waitTime: 100 });
emitter.emit('event1', { waitTime: 300 });
emitter.emit('event2', { waitTime: 401 });
emitter.emit('event1', { waitTime: 50, error: new Error('XXX!!!') });
emitter.emit('event1', { waitTime: 600 });
