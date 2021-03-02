const {filterFormats} = require('ytdl-core');
const ytdl = require('ytdl-core');
const {validateLink} = require('../AppFunctions/functions');

exports.download = function (req, res) {
  const URL = req.query.url;
  var name = req.query.name;

  if (!name) name = 'ytdl-file';

  const videoID = validateLink(URL);

  res.header('Content-Disposition', `attachment; filename="${name}.mp3"`);
  ytdl(videoID, {
    filter: format =>
      format.hasAudio == true && format.hasVideo == false && format.container == 'mp4',
  }).pipe(res); //{format: 'mp3'}
};
