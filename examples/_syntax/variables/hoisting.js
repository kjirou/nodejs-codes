#!/usr/bin/env node

const executeCallback = () => {
  return callback();
};

let callback = () => {
  return 1;
};

console.log(executeCallback());  // -> 1


const executeCallback2 = () => {
  return callback2();
};

var callback2 = () => {
  return 2;
};

console.log(executeCallback2());  // -> 2


const returnVariable = () => {
  return variable;
};

let variable = 3;

console.log(returnVariable());  // -> 3


const returnVariable2 = () => {
  return variable2;
};

var variable2 = 4;

console.log(returnVariable2());  // -> 4
