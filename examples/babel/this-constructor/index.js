#!/usr/bin/env babel-node

import assert from 'assert';


//
// 確認する点：
//
// - this.constructor で class 本体を参照できるのか
// - プロトタイプ継承を孫継承した場合に、
//   GrandSub 内でのそれが Sub を指してしまう問題は解消できているのか
//
class Super {
  getStaticNum() {
    return this.constructor.getNum();
  }
  static getNum() {
    return 1;
  }
}

class Sub extends Super {
  static getNum() {
    return 10;
  }
}

class GrandSub extends Sub {
  static getNum() {
    return 100;
  }
}


const super_ = new Super();
const sub = new Sub();
const grandSub = new GrandSub();

assert.strictEqual(super_.getStaticNum(), 1);
assert.strictEqual(sub.getStaticNum(), 10);
assert.strictEqual(grandSub.getStaticNum(), 100);
