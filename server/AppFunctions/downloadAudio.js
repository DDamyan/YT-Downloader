const ytdl = require('ytdl-core');
const {validateLink} = require('./functions');

exports.downloadAudio = function (req, res) {
  // console.log(reques);
  try {
    var URL = validateLink(req.query.url);
    if (URL) {
      ytdl(URL, {quality: 'highestaudio'}).pipe(res);
    } else throw 'invalid url';
  } catch (err) {
    res.json({error: err.toString()});
  }
};
