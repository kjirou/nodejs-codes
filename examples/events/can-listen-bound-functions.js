#!/usr/bin/env node

'use strict';

//
// browserify 内包の EventEmitter で、
// bound function を on に入れた場合に発火しない現象が発生して調査したやつ
//
// この環境だと動いてしまった
//

const EventEmitter = require('events').EventEmitter;

const emitter = new EventEmitter();
emitter.on('foo', () => { console.log('foo1'); });
emitter.emit('foo');

// 結論として無関係だった) Ref. https://github.com/nodejs/node/issues/6712
//var myListener = function() { console.log(this); };
//var myEmitter = new EventEmitter();
//myEmitter.on("demo", myListener.bind("Surrogate Object"));
//myEmitter.emit("demo");
