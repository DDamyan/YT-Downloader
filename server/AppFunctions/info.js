//const {filterFormats} = require('ytdl-core');
const ytdl = require('ytdl-core');
const {validateLink} = require('./functions');

exports.info = function (req, res) {
  var URL = req.query.url;
  console.log(URL);
  try {
    const videoID = validateLink(URL);

    if (videoID) {
      ytdl
        .getInfo(URL)
        .then(info => {
          var {title, author, thumbnails, videoId} = info.videoDetails;
          var artist = '';
          const splitTitle = title.split('-');
          if (splitTitle.length === 2) {
            title = splitTitle[1];
            artist = splitTitle[0];
          }
          const response = {
            'artist': artist.trim(),
            'title': title.trim(),
            'videoId': videoId,
            //'rating': info.player_response.videoDetails.averageRating,
            'uploaded by': author.name,
            'thumbnail': thumbnails[3],
            'formats': info.formats,
          };

          //var forms = ytdl.filterFormats(info.formats, 'audioonly');
          // var forms = ytdl.chooseFormat(info.formats, {quality: 'highestaudio'});
          // console.log(forms);

          res.json({url: URL, ...response});
        })
        .catch(err => {
          res.json({error: err.message});
        });
    } else {
      res.json({error: 'unvalid video-id'});
    }
  } catch (err) {
    res.json({error: err.message});
  }
};
