const ytdl = require('ytdl-core');

exports.validateLink = function (url) {
  if (ytdl.validateURL(url)) {
    const videoID = ytdl.getURLVideoID(url);
    if (ytdl.validateID(videoID)) return videoID;
  } else throw 'Link not valid';
};
