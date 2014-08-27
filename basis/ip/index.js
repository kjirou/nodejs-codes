#!/usr/bin/env node

//
// node-ip
//
//   https://github.com/indutny/node-ip
//

var ip = require('ip');
var assert = require('assert');


// CIDR でマスクして範囲指定する例
var ipData = ip.cidrSubnet('192.168.1.134/26');

assert(ipData.firstAddress === '192.168.1.129');
assert(ipData.lastAddress === '192.168.1.190');

assert(ip.toLong(ipData.firstAddress) <= ip.toLong('192.168.1.129'));
assert(ip.toLong(ipData.firstAddress) <= ip.toLong('192.168.1.128') === false);

assert(ip.toLong(ipData.lastAddress) >= ip.toLong('192.168.1.190'));
assert(ip.toLong(ipData.lastAddress) >= ip.toLong('192.168.1.191') === false);
