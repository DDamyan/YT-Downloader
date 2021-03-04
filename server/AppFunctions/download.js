const ytdl = require('ytdl-core');
const {validateLink} = require('../AppFunctions/functions');

const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');
const fs = require('fs');

/*exports.download = function (req, res) {
  const URL = req.query.url;
  var name = req.query.name;

  if (!name) name = 'ytdl-file';

  const videoID = validateLink(URL);

  res.header('Content-Disposition', `attachment; filename="${name}.mp3"`);
  ytdl(videoID, {
    filter: format =>
      format.hasAudio == true && format.hasVideo == false && format.container == 'mp4',
  }).pipe(res); //{format: 'mp3'}
};*/

exports.download = function (req, res) {
  req.setTimeout(600000); // 10 minuten

  const ref = validateLink(req.query.url);
  if (ref) {
    const userVideoName = req.query.name;
    if (userVideoName) {
      const itag = req.query.itag;
      if (itag) {
        try {
          ytdl
            .getInfo(ref)
            .then(info => {
              const dt = new Date().getTime();
              const name = dt + userVideoName + '.mp4';

              const Wformat = ytdl.chooseFormat(info.formats, {quality: itag});
              //const result = ytdl.downloadFromInfo(info, {filter: format => format === Wformat});

              //const ref = 'https://www.youtube.com/watch?v=XXYlFuWEuKI';
              const audio = ytdl.downloadFromInfo(info, {quality: 'highestaudio'});
              const video = ytdl.downloadFromInfo(info, {filter: format => format === Wformat});
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
                  // compressing
                  '-vcodec',
                  'libx265',
                  '-crf',
                  '50',
                  // Define output file
                  name,
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

                res.download(name, err => {
                  if (err) throw err;

                  fs.unlinkSync(name);
                });
              });

              //res.download('./TEST_output (1).mp4', err => console.log('Download failed: ', err));
              audio.pipe(testPRO.stdio[4]);
              video.pipe(testPRO.stdio[5]);
            })
            .catch(error => res.json({error: error.toString()}));
        } catch (error) {
          res.json({error: error.toString()});
        }
      } else {
        res.json({error: 'itag is required'});
      }
    } else {
      res.json({error: 'file name is required'});
    }
  } else {
    res.json({error: 'invalid url'});
  }
};
