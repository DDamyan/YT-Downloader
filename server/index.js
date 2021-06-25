const {info} = require('./AppFunctions/info');
const {download} = require('./AppFunctions/download');
const {returnAudio} = require('./AppFunctions/downloadAudio');

// const ffmpeg = require('ffmpeg-static');
// const cp = require('child_process');
// const fs = require('fs');
// const ytdl = require('ytdl-core');

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// const ffmetadata = require('ffmetadata');

app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.get('/download', download);

app.get('/info', info);

//app.get('/downloadAudio', downloadAudio);
app.get('/downloadAudio', (req, res) => {
  console.log('A0', new Date().toTimeString());
  res.setHeader('Content-Type', 'audio/mp4');
  returnAudio(req.query.url).pipe(res);
  console.log('A5', new Date().toTimeString());
});

// app.get('/test', (req, res) => {
//   try {
//     ffmetadata.read('Music.mp4', (err, data) => {
//       if (err) throw err;
//       else res.json(JSON.stringify(data));
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get('/lol', (req, res) => {
//   const ref = 'https://www.youtube.com/watch?v=RUQl6YcMalg';
//   ytdl
//     .getInfo(ref)
//     .then(info => {
//       try {
//         const Wformat = ytdl.chooseFormat(info.formats, {quality: '7'});
//         const result = ytdl.downloadFromInfo(info, {filter: format => format === Wformat});
//         res.json({format: result});
//       } catch (error) {
//         res.json({error: error.toString()});
//       }
//     })
//     .catch(error => res.json({error: error.toString()}));
// });

app.use(function (req, res, next) {
  res.status(404).json({error: '404 - Sorry cant find that!'});
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
