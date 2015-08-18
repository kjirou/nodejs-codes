#!/usr/bin/env node

var EventEmitter = require('events').EventEmitter;


var emitter = new EventEmitter();
emitter.on('foo', function() {
  console.log('on foo');
});

var emitter2 = new EventEmitter();
emitter2.emit('foo');  // Not emitted
