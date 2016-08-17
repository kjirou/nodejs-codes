#!/usr/bin/env node

'use strict';

let counter = 0;

const task = () => {
  if (counter >= 3) return;

  counter += 1;

  console.log(counter);

  // 自関数内で、自関数の参照を task 変数で取ることができる
  // ES5 の var foo = function(){} や function foo() {} でもどちらでも可
  setTimeout(task, 1000);
};

setTimeout(task, 0);
