const ytdl = require('ytdl-core');
const {validateLink} = require('../AppFunctions/functions');

const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');
const fs = require('fs');
// const ffmetadata = require('ffmetadata');

exports.download = function (req, res) {
  req.setTimeout(600000); // 10 minuten
  console.log('REQUEST!');
  const ref = validateLink(req.query.url);
  if (ref) {
    const userVideoName = req.query.name;
    if (userVideoName) {
      const artist = req.query.artist;
      if (artist) {
        const itag = req.query.itag;
        if (itag) {
          try {
            ytdl
              .getInfo(ref)
              .then(info => {
                const Wformat = ytdl.chooseFormat(info.formats, {quality: itag});

                const dt = new Date().getTime();
                const fileName = `${dt}_${userVideoName}.${Wformat.container}`;

                res.header(
                  'Content-Disposition',
                  `attachment; filename="${fileName}.${Wformat.container}"`,
                );

                //const result = ytdl.downloadFromInfo(info, {filter: format => format === Wformat});

                const toDownload = ytdl.downloadFromInfo(info, {
                  filter: format => format === Wformat,
                });

                if (Wformat.hasAudio) {
                  toDownload.pipe(res);
                } else {
                  //const ref = 'https://www.youtube.com/watch?v=XXYlFuWEuKI';
                  const audio = ytdl.downloadFromInfo(info, {quality: 'highestaudio'});
                  const ffmpefProgcess = cp.spawn(
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
                      //'-vcodec',
                      //'libx265',
                      //'-crf',
                      //'50',
                      // Define metadata
                      '-metadata',
                      'title=' + userVideoName,
                      '-metadata',
                      'artist=' + artist,
                      // Define output file

                      fileName,
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
                  ffmpefProgcess.on('close', () => {
                    //console.log('done!');

                    res.download(fileName, err => {
                      if (err) throw err;

                      fs.unlinkSync(fileName);
                    });
                  });

                  //res.download('./TEST_output (1).mp4', err => console.log('Download failed: ', err));
                  audio.pipe(ffmpefProgcess.stdio[4]);
                  toDownload.pipe(ffmpefProgcess.stdio[5]);
                }
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
      res.json({error: 'file name is required'});
    }
  } else {
    res.json({error: 'invalid url'});
  }
};
