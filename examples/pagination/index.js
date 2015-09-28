#!/usr/bin/env node

var assert = require('assert');
var pagination = require('pagination');
var SearchPaginator = pagination.SearchPaginator;


var objectList = [
  { name: 'Taro', age: 11 },
  { name: 'Jiro', age: 12 },
  { name: 'Saburo', age: 13 },
  { name: 'Shiro', age: 14 },
  { name: 'Goro', age: 15 },
];


var paginator, paginated;

//
// basic usage
//
paginator = new SearchPaginator({
  totalResult: objectList.length,
  rowsPerPage: 2,
  current: 1,
});
paginated = paginator.getPaginationData();

//console.log(paginated);
assert.strictEqual(paginated.pageCount, 3);
assert.strictEqual(paginated.fromResult, 1);
assert.strictEqual(paginated.toResult, 2);
assert.strictEqual(paginated.previous, null);
assert.strictEqual(paginated.next, 2);
assert.strictEqual(paginated.first, null);
assert.strictEqual(paginated.last, 3);

//
// set current page number to out of range
//
paginator = new SearchPaginator({
  totalResult: objectList.length,
  rowsPerPage: 2,
  current: 100,
});
paginated = paginator.getPaginationData();
assert.strictEqual(paginated.current, 3);  // Not overflow

paginator = new SearchPaginator({
  totalResult: objectList.length,
  rowsPerPage: 2,
  current: -100,
});
paginated = paginator.getPaginationData();
assert.strictEqual(paginated.current, -100);  // Overflow!
