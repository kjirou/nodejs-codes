// node.js == 0.10.22
var stream = require('stream');
var fs = require('fs');


// Ref) http://nodejs.jp/nodejs.org_ja/api/fs.html#fs_fs_createreadstream_path_options
var readableStream = fs.createReadStream('./data.txt', {
  // 0 番目から 3 番目までのバイトを読み込む, つまり 4 バイトずつ読み込む
  // ちなみに、start/end 両方設定必須っぽい
  start: 0,
  end: 3
});

// Ref) http://nodejs.jp/nodejs.org_ja/api/stream.html#stream_class_stream_transform_1
var chunkIndex = 0;
var transformer = new stream.Transform();
transformer._transform = function(chunk, encoding, callback){
  console.log('Start chunkIndex =', chunkIndex);
  console.log('chunk =', chunk.toString());
  console.log('encoding =', encoding);
  chunkIndex += 1;
};

readableStream
  .pipe(transformer)
  .pipe(process.stdout);
