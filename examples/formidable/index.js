#!/usr/bin/env node

//
// https://github.com/felixge/node-formidable#example
//

var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);


// POST 送るとこんな出力になる
/*
received upload:

{ fields: { title: '' },
  files: 
   { upload: 
      { domain: null,
        _events: {},
        _maxListeners: 10,
        size: 221941,
        path: '/var/folders/hj/d69mv02d6vlbrpnqt8z0_8f80000gn/T/1d3b0840dfb6d11703058e59002d0929',
        name: 'mammoth-1.png',
        type: 'image/png',
        hash: null,
        lastModifiedDate: Fri Nov 14 2014 21:33:10 GMT+0900 (JST),
        _writeStream: [Object] } } }
      res.end(util.inspect({fields: fields, files: files}));
    });
*/
