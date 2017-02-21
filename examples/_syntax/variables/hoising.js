#!/usr/bin/env node

const executeCallback = () => {
  return callback();
};

let callback = () => {
  return 1;
};

console.log(executeCallback());
