#!/usr/bin/env node

//
// 最も単純なイベントループの例
//
//  Ref) http://jxck.hatenablog.com/entry/for-with-eventloop
//  process は EventEmitter を継承しているので、それを使わせてもらう
//

process.on('count', function(c) {
  if (c > 10) {
    return;
  }
  console.log(c);
  process.emit('count', ++c);
});

process.emit('count', 0);
