const {info} = require('./AppFunctions/info');
const {download} = require('./AppFunctions/download');

// const ffmpeg = require('ffmpeg-static');
// const cp = require('child_process');
// const fs = require('fs');
const ytdl = require('ytdl-core');

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.get('/download', download);

app.get('/info', info);

app.get('/%C3%BC%C3%A4%C3%B6', (req, res) => {
  res.json({ready: 'ready'});
});

app.get('/lol', (req, res) => {
  const ref = 'https://www.youtube.com/watch?v=RUQl6YcMalg';
  ytdl
    .getInfo(ref)
    .then(info => {
      try {
        const Wformat = ytdl.chooseFormat(info.formats, {quality: '7'});
        const result = ytdl.downloadFromInfo(info, {filter: format => format === Wformat});
        res.json({format: result});
      } catch (error) {
        res.json({error: error.toString()});
      }
    })
    .catch(error => res.json({error: error.toString()}));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
