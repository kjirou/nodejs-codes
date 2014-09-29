#!/usr/bin/env node

var assert = require('assert');
var async = require('async');
var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var validator = require('validator');


async.waterfall([

  // シンプルな例
  function(nextStep){
    var FooSchema = new mongoose.Schema({
      email: {
        type: String,
        validate: [
          validate({
            validator: 'isEmail',
            message: 'It is not a email.'
          })
        ]
      }
    });
    var Foo = mongoose.model('Foo', FooSchema);

    var foo = new Foo();
    foo.email = 'abcdefgh';
    foo.save(function(err){
      assert(typeof err === 'object');
      assert(err.errors.email.message === 'It is not a email.');
      nextStep();
    });
  },

  // email フィールドに複数エラーが発生した例
  function(nextStep){
    var BarSchema = new mongoose.Schema({
      email: {
        type: String,
        validate: [
          validate({
            validator: 'isEmail',
            message: 'It is not a email.'
          }),
          validate({
            validator: 'isLength',
            // validator.isLength(email, 16) と指定したのと同じ
            arguments: [16],
            message: 'It is not equal greater than 16 length.'
          })
        ]
      }
    });
    var Bar = mongoose.model('Bar', BarSchema);

    // ふたつエラーが発生するようにすると、下に定義した方が優先して出力される
    var bar = new Bar();
    bar.email = 'abcdefgh';
    bar.save(function(err){
      assert(typeof err === 'object');
      assert(err.errors.email.message === 'It is not equal greater than 16 length.');
      nextStep();
    });
    nextStep();
  }
], function(err){
  assert(!err);
});

