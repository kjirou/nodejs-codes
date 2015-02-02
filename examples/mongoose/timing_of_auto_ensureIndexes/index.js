#!/usr/bin/env node

var assert = require('assert');
var mongoose = require('mongoose');


var FooSchema = new mongoose.Schema({
  foo: {
    type: String,
    index: {
      unique: true
    }
  }
});

// Model 生成時に ensureIndexes (MongoDB の ensureIndex) が
// 実行されていることを確認する
var isDoneEnsureIndexes = false;
mongoose.Model.ensureIndexes = function(){
  isDoneEnsureIndexes = true;
};

var FooModel = mongoose.model('Foo', FooSchema);

assert(isDoneEnsureIndexes);
