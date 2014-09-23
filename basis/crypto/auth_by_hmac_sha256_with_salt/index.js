#!/usr/bin/env node

var assert = require('assert');
var crypto = require('crypto');


//
// Ref)
//   salt について http://qa.atmarkit.co.jp/q/2121
//

// HMAC という手法でハッシュ化している
// SECRET_KEY はアプリ内で共通で良い
var SECRET_KEY = 'server_secret_key';
var generatePasswordHash = function(rawPassword, salt){
  var sha = crypto.createHmac('sha256', SECRET_KEY);
  sha.update(rawPassword + salt);
  return sha.digest('hex');
}

var users = {
  // salt の要件は以下：
  //
  // - ユーザー別にユニークである
  // - ある程度の長さ（20文字程度）が好ましい
  //
  // ランダム生成である必要はない。
  taro: { hashedPassword:'', salt:'taro_salt_12345678901234567890' },
  jiro: { hashedPassword:'', salt:'jiro_salt_12345678901234567890' }
};

users.taro.hashedPassword = generatePasswordHash('taro_desu', users.taro.salt);
users.jiro.hashedPassword = generatePasswordHash('jiro_desu', users.jiro.salt);


assert(generatePasswordHash('taro_desu', users.taro.salt) === users.taro.hashedPassword);
assert(generatePasswordHash('tarox_desu', users.taro.salt) !== users.taro.hashedPassword);
assert(generatePasswordHash('taro_desu', 'invalid_salt') !== users.taro.hashedPassword);

assert(generatePasswordHash('jiro_desu', users.jiro.salt) === users.jiro.hashedPassword);
assert(generatePasswordHash('jirox_desu', users.jiro.salt) !== users.jiro.hashedPassword);
assert(generatePasswordHash('jiro_desu', 'invalid_salt') !== users.jiro.hashedPassword);
