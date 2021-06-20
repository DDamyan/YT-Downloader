import {fetchFile} from '@ffmpeg/ffmpeg';

export async function handleDownload(ffmpeg, url, name, itag, artist, format) {
  console.log({url: url, name: name, itag: itag, artist: artist, format: format});
  try {
    if (itag <= 0 || typeof itag == 'undefined') throw Error('plz select a format');
    // TODO: merge video and audio to one !!! <-------------------------------------------------------------

    if (format === 'mp3') {
      console.log('Sending to server');
      const response = await fetch(`http://localhost:5000/downloadAudio?url=${url}`);
      console.log('response', response);
      if (!response.ok) throw Error('Something went fromg with the server fetch');

      const blob = await response.blob();
      console.log('blob::', blob);
      const hrefUrl = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = hrefUrl;
      a.download = `${artist}-${name}.${format}`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      const response = await fetch(`http://localhost:5000/download?url=${url}&itag=${itag}`);
      const audioResponse = await fetch(`http://localhost:5000/downloadAudio?url=${url}`);
      // `http://localhost:5000/download?url=${url}&name=${name}&itag=${itag}&artist=${artist}`,

      if (!response.ok || !audioResponse.ok)
        throw Error('Something went fromg with the server fetch');

      const contentType = response.headers.get('Content-Type');
      const audioContentType = response.headers.get('Content-Type');
      console.log('audioContentType', audioContentType);
      if (contentType && contentType.indexOf('application/json') !== -1)
        // JSON
        throw (await response.json()).error;
      else if (contentType) {
        // FILE
        console.log('before blob');
        const blob = await response.blob();
        const audioBlob = await audioResponse.blob();
        console.log('after blob');
        //   const {ffmpeg} = props;
        const tempFile = `temp.${format}`,
          outFile = `out.${format}`;

        const audioTempFile = `temp.mp3`;

        // write file to memory
        ffmpeg.FS('writeFile', tempFile, await fetchFile(blob));
        ffmpeg.FS('writeFile', audioTempFile, await fetchFile(audioBlob));

        // Show Progress
        ffmpeg.setProgress(({ratio}) => {
          console.log(ratio);
          /*
           * ratio is a float number between 0 to 1.
           */
        });
        // Run the FFMpeg command
        await ffmpeg.run(
          '-y',
          '-i',
          tempFile,
          '-i',
          audioTempFile,
          //'-map',
          //'0:v:0',
          '-map',
          '0:v',
          '-map',
          '1:a',
          '-metadata',
          `title=${name}`,
          '-metadata',
          `artist=${artist}`,
          // '-codec',
          '-c:v',
          'copy',
          outFile,
        );
        // Read the result
        const dataFile = ffmpeg.FS('readFile', outFile);

        const hrefUrl = window.URL.createObjectURL(
          new Blob([dataFile.buffer], {type: 'video/mp4'}),
        );
        var a = document.createElement('a');
        a.href = hrefUrl;
        a.download = `${artist}-${name}.${format}`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();

        ffmpeg.FS('unlink', outFile);
        ffmpeg.FS('unlink', tempFile);
      } else {
        throw 'Fetch went wrong';
      }
    }
  } catch (err) {
    alert(err);
  }
}
