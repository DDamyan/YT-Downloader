const ytdl = require('ytdl-core');
const {validateLink} = require('./functions');

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/download', (req, res) => {
  var URL = req.query.url;

  res.header('Content-Disposition', 'attachment; filename="filename.mp3"');
  ytdl(URL, {format: 'mp3'}).pipe(res);
});

app.get('/info', (req, res) => {
  var URL = req.query.url;

  try {
    const videoID = validateLink(URL);

    if (videoID) {
      ytdl.getInfo(URL).then(info => {
        const response = {
          'title': info.videoDetails.title,
          'rating': info.player_response.videoDetails.averageRating,
          'uploaded by': info.videoDetails.author.name,
        };

        res.json({url: URL, ...response});
      });
    } else res.json({error: 'unvalid video-id'});
  } catch (err) {
    res.json({error: err});
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
