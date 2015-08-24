#!/usr/bin/env node

//
// TODO:
// - Pricing
// - 誰からでも呼べるようにするには？
// - 呼び出し回数制限を掛けられるのか
//

//
// Lambda:
//   http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html
//
// context object:
//   http://docs.aws.amazon.com/lambda/latest/dg/programming-model.html#programming-model-context-object
//   - とりあえず done(err, data) 使っとけば良さそう
//
// Response syntax
//   http://docs.aws.amazon.com/lambda/latest/dg/API_InvokeAsync.html#API_InvokeAsync_ResponseSyntax
//
// InvokeAsync は非推奨だと
// > This API is deprecated. We recommend you use Invoke API
//
// Invoke
// http://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html
//
// [node]AWS LambdaをJavascriptから呼び出す:
//   http://dev.classmethod.jp/cloud/aws/node-lambda/
//
// ----
// Tips:
// - Lambda 管理画面の Code タブ内で Test すると { key1, key2, key3 } が入る
//

var async = require('async');
var AWS = require('aws-sdk');
var _ = require('lodash');

var awsConfig = require('./aws-config.json');
awsConfig = _.assign({}, awsConfig, {
  region: 'ap-northeast-1'
});

var lambda = new AWS.Lambda(awsConfig);


async.series([

  function(next) {
    lambda.listFunctions(function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      next();
    });
  },

  // invoke
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html#invoke-property
  function(next) {
    var params = {
      FunctionName: 'myLambdaTest',
      Payload: JSON.stringify({
        key1: 'KeyKeyKey',
        foo: 111,
        bar: 222
      })
    };
    lambda.invoke(params, function(err, data) {
    //lambda.invokeAsync(params, function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(arguments);
      next();
    });
  }
], function(err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Finish');
});
