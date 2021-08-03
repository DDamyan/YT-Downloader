const ytdl = require('ytdl-core');
const {validateLink} = require('./functions');

exports.downloadAudio = function (req, res) {
  try {
    console.log('Audio-REQUEST!!!');
    var URL = validateLink(req.query.url);
    if (URL) {
      ytdl(URL, {quality: 'highestaudio', filter: 'audioonly'}).pipe(res);
    } else throw 'invalid url';
  } catch (err) {
    return {error: err.toString()};
  }
};

exports.returnAudio = function (_url) {
  // try {
  console.log('return-Audio-REQUEST!!!');
  console.log('A1', new Date().toTimeString());
  var URL = validateLink(_url);
  console.log('A2', new Date().toTimeString());
  if (URL) {
    console.log('A3', new Date().toTimeString());
    return ytdl(URL, {quality: 'highestaudio'}).on('end', () => {
      console.log('=END', new Date().toTimeString());
    });
  } else throw 'invalid url';
  // } catch (err) {
  //   return {error: err.toString()};
  // }
};

// exports.downloadAudio = function (req, res) {
//   try {
//     var URL = validateLink(req.query.url);
//     if (URL) {
//       ytdl(URL, {quality: 'highestaudio'}).pipe(res);
//     } else throw 'invalid url';
//   } catch (err) {
//     res.json({error: err.toString()});
//   }
// };
