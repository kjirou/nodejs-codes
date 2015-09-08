/* @flow */

function foo(x/*: number*/, y/*: number*/)/*: string */ {
  return String(x) + ':' + String(y);
}

foo(1, 2);
//foo('a', 2);
