#!/usr/bin/env node

const EventEmitter = require('events').EventEmitter;

const Rx = require('rxjs/Rx');

//
// TODO: toPromise の使い方がわからない
//

class MyEventEmitter extends EventEmitter {
}

const emitter = new MyEventEmitter();


//
// fromEvent だと 'event1' しか listen できない
// https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/fromeventpattern.md
//
//const source = Rx.Observable.fromEvent(emitter, 'event1');
const source = Rx.Observable
  .fromEventPattern(
    (rxCallback) => {
      emitter.addListener('event1', rxCallback);
      emitter.addListener('event2', rxCallback);
    },
    (rxCallback) => {
      // TODO:
      // removeListener するらしい
    }
  )
;

// RxJS 5 からの pausable 実装について
// Ref) https://github.com/ReactiveX/rxjs/issues/1542#issuecomment-202540367
const pauser = new Rx.Subject();

const pausableSource = pauser.switchMap(paused => paused ? Rx.Observable.never() : source);

//const stream = source
const stream = pausableSource
  .concatMap(payload => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (payload.error) {
          reject(payload.error);
        } else if (payload.paused) {
          resolve(payload);
        } else {
          resolve(payload);
        }
      }, payload.waitTime);
    });
    return Rx.Observable.fromPromise(promise);
  })
;


const subscription = stream
  .subscribe(
    // success
    (payload) => {
      console.log('success:', payload);
    },
    // error　エラーハンドリング、一度でもエラーを流すとここに入って終わる
    // Ref) http://qiita.com/bouzuya/items/5e068659d63d9961a260
    (payload) => {
      console.log('error:', payload);
    },
    // TODO: 何か実行されないけどいいや、fromEvent だから終わりがないのかも
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

pauser.next(false);


// 登録順で、常に 1 処理だけ、実行される
emitter.emit('event1', { waitTime: 500 });
emitter.emit('event1', { waitTime: 1000 });
emitter.emit('event2', { waitTime: 501 });
emitter.emit('event1', { waitTime: 100 });
emitter.emit('event1', { waitTime: 500 });
emitter.emit('event2', { waitTime: 1001 });
//pauser.next(true);  // この外部入力により止められる
emitter.emit('event1', { waitTime: 50, error: new Error('XXX!!!') });
emitter.emit('event1', { waitTime: 600 });
