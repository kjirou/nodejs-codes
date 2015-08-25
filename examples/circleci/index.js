#!/usr/bin/env node

var CircleCI = require('circleci');
var assert = require('assert');

var config = require('./circleci-config.json');


var ci = new CircleCI(config);


Promise.resolve()
  //.then(function() {
  //  return ci.getUser();
  //})
  //.then(function(user) {
  //  console.log('User:');
  //  console.log(user);
  //})
  //.then(function() {
  //  return ci.getProjects();
  //})
  //.then(function(projects) {
  //  console.log(projects);
  //})
  .then(function() {
    return ci.getBuilds({
      username: 'kjirou',
      project: 'escape-from-the-maze'
    });
  })
  .then(function(projects) {
    // outcom に結果が文字列で入ってる
    console.log(projects);
  })
;
