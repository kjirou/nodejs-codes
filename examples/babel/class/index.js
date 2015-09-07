#!/usr/bin/env babel-node

import assert from 'assert';


//
// https://github.com/brigand/react-mixin で下記記法が書いてあったけどやっぱり動かない
//
//class Foo {
//  static x = 1;
//  static obj = {
//    a: 1,
//    b: 2
//  };
//}
//
//console.log(Foo);
//console.log(Foo.x);
//console.log(Foo.obj);


//
// Dynamic definition
//
// babel でコンパイルすると正しい ES5 ソースになるが
// babel-node で直接実行すると失敗する
//
//const Bar = class {
//  constructor() {
//    this.x = 11;
//  }
//};
//
//assert.strictEqual(typeof Bar, 'function');
//assert.strictEqual(Bar.name, 'Bar');
//
//const bar = new Bar();
//assert(bar instanceof Bar);
//assert.strictEqual(bar.x, 11);
