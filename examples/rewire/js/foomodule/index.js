require('../globals');


function plusOne(a){
  return a + 1;
}
var plusTwo = function(a){
  return a + 2;
};

if (true) {
  function plusOneInBlock(a){
    return a + 1;
  }
  var plusTwoInBlock = function(a){
    return a + 2;
  };
};

var plusTwoInFunction = undefined;
(function(){
  plusTwoInFunction = function(a){
    return a + 2;
  };
})();


exports.getDirname = function(){
  return __dirname;
};

exports.getAppEnv = function(){
  return global.APP_ENV;
};

exports.getLodash = function(){
  return require('lodash');
};

exports.getBarmodule = function(){
  return require('../barmodule');
};
