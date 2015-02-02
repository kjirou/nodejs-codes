#!/usr/bin/env node

var assert = require('assert');
var moment = require('moment');


var m;

// 引数なしは正しい時刻を返す
m = moment();
assert(m.isValid() === true);
assert(m.toDate() instanceof Date === true);

// undefined でも引数なしと同じ
m = moment(undefined);
assert(m.isValid() === true);

// null だと不正な moment/Date オブジェクトになる
m = moment(null);
assert(m.isValid() === false);
assert(m.toDate() instanceof Date === true);

// 不正な文字列の場合も null と同様。
// ただし、new Date で包まないと、以下の Deprecation warning が出る。
// 2.4.0 の時は null を返していた。
//
//   Deprecation warning: moment construction falls back to js Date.
//   This is discouraged and will be removed in upcoming major release.
//   Please refer to https://github.com/moment/moment/issues/1407 for more info.
//
m = moment(new Date('invalid_date_string'));
assert(m.isValid() === false);
