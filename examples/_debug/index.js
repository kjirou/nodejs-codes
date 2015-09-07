//
// node debug script.js で一応デバッグっぽいことができるけど
//
// - debug> n で先頭から1文ずつ実行
// - debug> c でモジュールとか非同期タスク単位で飛ぶらしいけど、現在動かない
//   Ref) https://github.com/nodejs/node-v0.x-archive/issues/25358
//
// ということで、「指定箇所からデバッグをはじめる」という方法がわからず
// 現在のところ活用できていない
//

var foo, bar, baz;

foo = 1;
bar = 2;
baz = 3;

console.log(foo, bar, baz);

setTimeout(function() {
  var x = 1;
  debugger;
  console.log('After debugger');
}, 1000);
