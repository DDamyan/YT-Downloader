const {info} = require('./AppFunctions/info');
const {download} = require('./AppFunctions/download');

const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');
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

app.get('/test', (req, res) => {
  try {
    const ref = 'https://www.youtube.com/watch?v=gpLJKNPtKB8';
    const audio = ytdl(ref, {quality: 'highestaudio'});
    const video = ytdl(ref, {quality: 'highestvideo'});
    console.log('requesting...');
    const testPRO = cp.spawn(
      ffmpeg,
      [
        //hide logs on console
        '-loglevel',
        '8',
        '-hide_banner',
        // // // //
        '-y', // replace existing file
        // set using threads
        '-threads',
        '6',
        // Set inputs
        '-i',
        'pipe:4',
        '-i',
        'pipe:5',
        // Map audio & video from streams
        '-map',
        '0:a',
        '-map',
        '1:v',
        // Keep encoding
        '-c:v',
        'copy',
        // Define output file
        'TEST.mp4',
      ],
      {
        windowsHide: true, //true
        stdio: [
          /* Standard: stdin, stdout, stderr */
          'inherit',
          'inherit',
          'inherit',
          /* Custom: pipe:3, pipe:4, pipe:5 */
          'pipe',
          'pipe',
          'pipe',
        ],
      },
    );
    testPRO.on('close', () => {
      console.log('done!');
    });

    //res.download('./TEST_output (1).mp4', err => console.log('Download failed: ', err));
    audio.pipe(testPRO.stdio[4]);
    video.pipe(testPRO.stdio[5]);
  } catch (error) {
    console.log('!-error:', error);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
