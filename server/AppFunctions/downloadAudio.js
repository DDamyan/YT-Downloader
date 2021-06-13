const ytdl = require('ytdl-core');
const {validateLink} = require('./functions');

exports.downloadAudio = function (_url) {
  try {
    // var URL = validateLink(_url);
    if (_url) {
      return ytdl(_url, {quality: 'highestaudio'});
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
