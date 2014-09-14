#!/usr/bin/env node

//
// イベントの登録方法によりイベントループ内での実行順が変わることを検証したかった..
//
// ..したかったんだけど、setTimeout.10 のやつを 1000 にすると
// setImmediate の方が先になる。
// 理由不明。
//
// Ref) http://jxck.hatenablog.com/entry/for-with-eventloop
//

var assert = require('assert');
var _ = require('underscore');


var emissions = [];

process.on('foo', function(emittedFrom){
  emissions.push(emittedFrom);
  console.log(emittedFrom);
});

// 登録順をシャッフルして、この時は登録順無関係なことを担保する
var registers = _.shuffle([
  function(){
    process.nextTick(function(){
      process.emit('foo', 'process.nextTick');
      assert.deepEqual(emissions, [
        'process.nextTick'
      ]);
    });
  },

  function(){
    setTimeout(function(){
      process.emit('foo', 'setTimeout.0');
      assert.deepEqual(emissions, [
        'process.nextTick',
        'setTimeout.0'
      ]);
    }, 0);
  },

  function(){
    setTimeout(function(){
      process.emit('foo', 'setTimeout.10');
      assert.deepEqual(emissions, [
        'process.nextTick',
        'setTimeout.0',
        'setTimeout.10'
      ]);
    }, 10);
  },

  function(){
    setImmediate(function(){
      process.emit('foo', 'setImmediate');
      assert.deepEqual(emissions, [
        'process.nextTick',
        'setTimeout.0',
        'setTimeout.10',
        'setImmediate'
      ]);
      console.log('Script End');
    });
  }
]);

registers.forEach(function(register){
  register();
});
