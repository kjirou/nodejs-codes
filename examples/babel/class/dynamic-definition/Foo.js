#!/usr/bin/env babel-node

import assert from 'assert';


//
// Dynamic definition (? 正式名称不明)
//
// babel でコンパイルすると正しい ES5 ソースになる
// また babel/resister でも動く
//
// なお、以下も動く：
// ```
// $ babel-node -e 'const Foo = class Foo {}; new Foo();'
// ```
//
// しかし、export default Foo; の行を消して
// babel-node でこのソースを直接実行すると失敗する
//
// 記法としては正しいみたいなので、気にしない
// Ref) http://www.2ality.com/2015/02/es6-classes-final.html
//
const Foo = class {
  constructor() {
    this.x = 11;
  }
};

assert.strictEqual(typeof Foo, 'function');
assert.strictEqual(Foo.name, 'Foo');

const foo = new Foo();
assert(foo instanceof Foo);
assert.strictEqual(foo.x, 11);

export default Foo;
