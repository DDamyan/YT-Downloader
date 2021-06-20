const ytdl = require('ytdl-core');
const {validateLink} = require('./functions');

exports.downloadAudio = function (req, res) {
  try {
    console.log('Audio-REQUEST!!!');
    var URL = validateLink(req.query.url);
    if (URL) {
      ytdl(URL, {quality: 'highestaudio'}).pipe(res);
    } else throw 'invalid url';
  } catch (err) {
    return {error: err.toString()};
  }
};

exports.returnAudio = function (_url) {
  try {
    console.log('return-Audio-REQUEST!!!');
    var URL = validateLink(_url);
    if (URL) {
      return ytdl(URL, {quality: 'lowestaudio'});
    } else throw 'invalid url';
  } catch (err) {
    return {error: err.toString()};
  }
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
