#!/usr/bin/env node

//
// aws-sdk:
//   http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-intro.html
// Config:
//   http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html
// S3 example:
//   http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-examples.html
// S3 APIs:
//   http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
//

var AWS = require('aws-sdk');

var awsConfig = require('./aws-config.json');


var s3 = new AWS.S3(awsConfig);

s3.listBuckets(function(err, data) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
