#!/usr/bin/env babel-node

//
// https://github.com/brigand/react-mixin で下記記法が書いてあったけどやっぱり動かない
//

class Foo {
  static x = 1;
  static obj = {
    a: 1,
    b: 2
  };
}

console.log(Foo);
console.log(Foo.x);
console.log(Foo.obj);
