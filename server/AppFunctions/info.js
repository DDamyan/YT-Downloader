const {filterFormats} = require('ytdl-core');
const ytdl = require('ytdl-core');
const {validateLink} = require('./functions');

exports.info = function (req, res) {
  var URL = req.query.url;

  try {
    const videoID = validateLink(URL);

    if (videoID) {
      ytdl.getInfo(URL).then(info => {
        const response = {
          'title': info.videoDetails.title,
          //'rating': info.player_response.videoDetails.averageRating,
          'uploaded by': info.videoDetails.author.name,
          'thumbnail': info.videoDetails.thumbnails[3],
          'formats': info.formats,
        };

        //var forms = ytdl.filterFormats(info.formats, 'audioonly');
        // var forms = ytdl.chooseFormat(info.formats, {quality: 'highestaudio'});
        // console.log(forms);

        res.json({url: URL, ...response});
      });
    } else res.json({error: 'unvalid video-id'});
  } catch (err) {
    res.json({error: err});
  }
};
