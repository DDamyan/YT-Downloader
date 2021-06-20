const ytdl = require('ytdl-core');
const {validateLink} = require('../AppFunctions/functions');
const {downloadAudio} = require('./downloadAudio');

exports.download = function (req, res) {
  // req.setTimeout(600000); // 10 minuten
  console.log('REQUEST!');
  const URL = validateLink(req.query.url);
  if (URL) {
    // const userVideoName = req.query.name;
    // if (userVideoName) {
    //const artist = req.query.artist;
    // if (artist) {
    const itag = req.query.itag;
    // if (itag && itag == 140) {
    // res.json({error: 'It is a mp3!!'});
    //res.setHeader('Content-Type', 'audio/mpeg');
    // downloadAudio(URL).pipe(res);
    // console.log('audio typeof ->', typeof audio);
    // if (typeof audio === 'object') {
    //   if (audio.hasOwnProperty('error')) console.log(audio);
    //   else audio.pipe(res);
    // }
    // audio.pipe(res);
    //} else
    if (itag) {
      try {
        ytdl
          .getInfo(URL)
          .then(info => {
            const wantedFormat = ytdl.chooseFormat(info.formats, {quality: itag});

            const toDownload = ytdl.downloadFromInfo(info, {
              filter: format => format === wantedFormat,
            });

            if (toDownload) {
              res.setHeader('Content-Type', 'video/mp4');
              toDownload.pipe(res);
            }
            // if (Wformat.hasAudio) {
            // toDownload.pipe(res);
          })
          .catch(error => res.json({error: error.toString()}));
      } catch (error) {
        res.json({error: error.toString()});
      }
    } else {
      res.json({error: 'itag is required'});
    }
    // } else {
    //   res.json({error: 'artist name is required'});
    // }
    // } else {
    //   res.json({error: 'file name is required'});
    // }
  } else {
    res.json({error: 'invalid url'});
  }
};

// ****** OLD ****** \\

// const ffmpeg = require('ffmpeg-static');
// const cp = require('child_process');
// const fs = require('fs');
// const ffmetadata = require('ffmetadata');

// ffmetadata.setFfmpegPath(ffmpeg);

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

// exports.download = function (req, res) {
//   // req.setTimeout(600000); // 10 minuten
//   console.log('REQUEST!');
//   const URL = validateLink(req.query.url);
//   if (URL) {
//     // const userVideoName = req.query.name;
//     // if (userVideoName) {
//     //const artist = req.query.artist;
//     // if (artist) {
//     const itag = req.query.itag;
//     if (itag) {
//       try {
//         ytdl
//           .getInfo(URL)
//           .then(info => {
//             const wantedFormat = ytdl.chooseFormat(info.formats, {quality: itag});

//             //const dt = new Date().getTime();
//             //const fileName = `${dt}_${userVideoName}.${Wformat.container}`;

//             // res.header(
//             //   'Content-Disposition',
//             //   `attachment; filename="${fileName}.${Wformat.container}"`,
//             // );

//             //const result = ytdl.downloadFromInfo(info, {filter: format => format === Wformat});

//             const toDownload = ytdl.downloadFromInfo(info, {
//               filter: format => format === wantedFormat,
//             });

//             console.log('toDownload', toDownload);

//             if (toDownload) {
//               res.setHeader('Content-Type', 'video/mp4');
//               toDownload.pipe(res);
//             }
//             // if (Wformat.hasAudio) {
//             // toDownload.pipe(res);
//             //   //TEST: CHANGE METADATA
//             //   //const audio = ytdl.downloadFromInfo(info, {quality: 'highestaudio'});

//             //   const tempFile = fs.createWriteStream(fileName);

//             //   var stream = toDownload.pipe(tempFile);
//             //   stream.on('close', () => {
//             //     console.log('ready');

//             //     // fs.readFile(fileName, (err, data) => {
//             //     //   console.log(data);
//             //     // });
//             //     const metadata = {
//             //       title: userVideoName,
//             //       artist: artist,
//             //     };

//             //     ffmetadata.write(fileName, metadata, err => {
//             //       if (err) throw err;
//             //       else {
//             //         // !!! ==> metadaten wertden geschrieben aber nich beim Download übertragen!!!
//             //         console.log('Data written!!');
//             //         ffmetadata.read(fileName, {}, (err, data) => {
//             //           if (err) throw err;
//             //           else console.log(data);
//             //         });
//             //         res.download(fileName, err => {
//             //           if (err) throw err;
//             //           //fs.unlinkSync(fileName);
//             //         });
//             //       }
//             //     });
//             //     // ffmetadata.read(fileName, {}, (err, data) => {
//             //     //   if (err) throw err;
//             //     //   else console.log(data);
//             //     // });
//             //   });
//             //   // const ffmpefProgcess = cp.spawn(
//             //   //   ffmpeg,
//             //   //   [
//             //   //     //hide logs on console
//             //   //     '-loglevel',
//             //   //     '8',
//             //   //     '-hide_banner',
//             //   //     // // // //
//             //   //     '-y', // replace existing file
//             //   //     // set using threads
//             //   //     // '-threads',
//             //   //     // '6',
//             //   //     // Set inputs
//             //   //     '-i',
//             //   //     'pipe:4',
//             //   //     // '-i',
//             //   //     // 'pipe:5',
//             //   //     // Map audio & video from streams
//             //   //     // '-map',
//             //   //     // '0:a',
//             //   //     '-map',
//             //   //     '0:0',
//             //   //     '-codec',
//             //   //     'copy',
//             //   //     // '-map',
//             //   //     // '1:v',
//             //   //     // Keep encoding
//             //   //     // '-c:v',
//             //   //     // 'copy',
//             //   //     // compressing
//             //   //     //'-vcodec',
//             //   //     //'libx265',
//             //   //     //'-crf',
//             //   //     //'50',
//             //   //     // Define metadata
//             //   //     '-metadata',
//             //   //     'title=' + userVideoName,
//             //   //     '-metadata',
//             //   //     'artist=' + artist,
//             //   //     //CODEC
//             //   //     // '-codec',
//             //   //     // 'copy',
//             //   //     // Define output file

//             //   //     fileName,
//             //   //   ],
//             //   //   {
//             //   //     windowsHide: true,
//             //   //     stdio: [
//             //   //       /* Standard: stdin, stdout, stderr */
//             //   //       'inherit',
//             //   //       'inherit',
//             //   //       'inherit',
//             //   //       /* Custom: pipe:3, pipe:4, pipe:5 */
//             //   //       'pipe',
//             //   //       'pipe',
//             //   //       'pipe',
//             //   //     ],
//             //   //   },
//             //   // );

//             //   // ffmpefProgcess.on('exit', () => {
//             //   //   //console.log('done!');
//             //   //   // const metadata = {
//             //   //   //   title: userVideoName,
//             //   //   //   artist: artist,
//             //   //   // };

//             //   //   ffmetadata.read(fileName, (error, data) => {
//             //   //     if (error) throw error;
//             //   //     else {
//             //   //       res.download(fileName, err => {
//             //   //         if (err) throw err;

//             //   //         fs.unlinkSync(fileName);
//             //   //       });
//             //   //       console.log(data);
//             //   //     }
//             //   //   });
//             //   //   //ffmetadata.write(fileName, metadata, metadataError => {
//             //   //   //if (metadataError) throw metadataError;
//             //   //   //else {

//             //   //   // }
//             //   //   // });
//             //   // });

//             //   // //res.download('./TEST_output (1).mp4', err => console.log('Download failed: ', err));
//             //   // // audio.pipe(ffmpefProgcess.stdio[4]);
//             //   // toDownload.pipe(ffmpefProgcess.stdio[4]);
//             //   ///////////////////////////
//             // } else {
//             //   //const ref = 'https://www.youtube.com/watch?v=XXYlFuWEuKI';
//             //   const audio = ytdl.downloadFromInfo(info, {quality: 'highestaudio'});
//             //   const ffmpefProgcess = cp.spawn(
//             //     ffmpeg,
//             //     [
//             //       //hide logs on console
//             //       '-loglevel',
//             //       '8',
//             //       '-hide_banner',
//             //       // // // //
//             //       '-y', // replace existing file
//             //       // set using threads
//             //       '-threads',
//             //       '6',
//             //       // Set inputs
//             //       '-i',
//             //       'pipe:4',
//             //       '-i',
//             //       'pipe:5',
//             //       // Map audio & video from streams
//             //       '-map',
//             //       '0:a',
//             //       '-map',
//             //       '1:v',
//             //       // Keep encoding
//             //       '-c:v',
//             //       'copy',
//             //       // compressing
//             //       //'-vcodec',
//             //       //'libx265',
//             //       //'-crf',
//             //       //'50',
//             //       // Define metadata
//             //       '-metadata',
//             //       'title=' + userVideoName,
//             //       '-metadata',
//             //       'artist=' + artist,
//             //       // Define output file

//             //       fileName,
//             //     ],
//             //     {
//             //       windowsHide: true, //true
//             //       stdio: [
//             //         /* Standard: stdin, stdout, stderr */
//             //         'inherit',
//             //         'inherit',
//             //         'inherit',
//             //         /* Custom: pipe:3, pipe:4, pipe:5 */
//             //         'pipe',
//             //         'pipe',
//             //         'pipe',
//             //       ],
//             //     },
//             //   );
//             //   ffmpefProgcess.on('close', () => {
//             //     //console.log('done!');

//             //     res.download(fileName, err => {
//             //       if (err) throw err;

//             //       fs.unlinkSync(fileName);
//             //     });
//             //   });

//             //   //res.download('./TEST_output (1).mp4', err => console.log('Download failed: ', err));
//             //   audio.pipe(ffmpefProgcess.stdio[4]);
//             //   toDownload.pipe(ffmpefProgcess.stdio[5]);
//             // }
//           })
//           .catch(error => res.json({error: error.toString()}));
//       } catch (error) {
//         res.json({error: error.toString()});
//       }
//     } else {
//       res.json({error: 'itag is required'});
//     }
//     // } else {
//     //   res.json({error: 'artist name is required'});
//     // }
//     // } else {
//     //   res.json({error: 'file name is required'});
//     // }
//   } else {
//     res.json({error: 'invalid url'});
//   }
// };
