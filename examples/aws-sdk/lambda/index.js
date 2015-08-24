#!/usr/bin/env node

//
// TODO:
// - InvokeArgs コールバック内で context.succeed した値が取れない
// - 誰からでも呼べるようにするには？
// - Pricing
// - 呼び出し回数制限を掛けられるのか
//

//
// Lambda:
//   http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html
//
// [node]AWS LambdaをJavascriptから呼び出す:
//   http://dev.classmethod.jp/cloud/aws/node-lambda/
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

  function(next) {
    var params = {
      FunctionName: 'myLambdaTest',
      InvokeArgs: '{\"foo\":\"hello lambda!\"}'
    };
    lambda.invokeAsync(params, function(err, data) {
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
