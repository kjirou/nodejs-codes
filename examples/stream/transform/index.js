// node.js == 0.10.22
var stream = require('stream');
var fs = require('fs');


var DATA_FILE_PATH = './data.txt'


// 事前にデータをチェックする。
// 文字列から file like なオブジェクトを作成する方法が不明だったため。
// 今度は、ファイル読み込みじゃなくて、素の Stream からで良さそう。
var dataText = fs.readFileSync(DATA_FILE_PATH).toString();
if (dataText !== 'aaaabbbbccccddddeeeeffff\n') {
  throw new Error('Invalid data.txt');
}


// テスト用 ReadableStream 生成のためにファイルを読み込む。
// Ref) http://nodejs.jp/nodejs.org_ja/api/fs.html#fs_fs_createreadstream_path_options
var readableStream = fs.createReadStream(DATA_FILE_PATH, {
  // 4 バイトずつ読み込む、旧 bufferSize オプション
  // v0.10 からそうらしい http://blog.nodejs.org/2012/12/20/streams2/
  highWaterMark: 4,
  // 末尾の改行文字を切るために、全体で 24 バイト目まで読み込む
  start: 0,
  end: 23
});


// Ref) http://nodejs.jp/nodejs.org_ja/api/stream.html#stream_class_stream_transform_1
var chunkIndex = 0;
var transformer = new stream.Transform();

transformer._transform = function(chunk, encoding, callback){

  // Buffer 型なのでキャストする
  var chunkAsString = chunk.toString();

  // push で変換後の出力を溜める
  this.push(chunkAsString.toUpperCase() + chunkIndex);

  chunkIndex += 1;

  // 1 chunk の処理が終了したら callback を呼ぶ、エラーがあれば第一引数へ
  callback();
};

// 処理終了時に呼ばれる、任意設定
transformer._flush = function(callback){
  this.push('\nEND');
  callback();
};


// 出力は
//
//   AAAA0BBBB1CCCC2DDDD3EEEE4FFFF5
//   END
//
// になる
readableStream
  .pipe(transformer)
  .pipe(process.stdout);
