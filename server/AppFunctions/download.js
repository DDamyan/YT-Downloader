const ytdl = require('ytdl-core');

exports.download = function (req, res) {
  var URL = req.query.url;

  res.header('Content-Disposition', 'attachment; filename="filename.mp3"');
  ytdl(URL, {format: 'mp3'}).pipe(res);
};
