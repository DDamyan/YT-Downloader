import {fetchFile} from '@ffmpeg/ffmpeg';

export async function handleDownload(ffmpeg, url, name, itag, artist, format) {
  console.log({url: url, name: name, itag: itag, artist: artist, format: format});
  try {
    if (itag <= 0 || typeof itag == 'undefined') throw Error('plz select a format');
    // TODO: merge video and audio to one !!! <-------------------------------------------------------------
    const response = await fetch(`http://localhost:5000/download?url=${url}&itag=${itag}`);
    // `http://localhost:5000/download?url=${url}&name=${name}&itag=${itag}&artist=${artist}`,

    if (!response.ok) throw Error('Something went fromg with the server fetch');

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.indexOf('application/json') !== -1)
      // JSON
      throw (await response.json()).error;
    else if (contentType) {
      // FILE
      const blob = await response.blob();
      //   const {ffmpeg} = props;
      const tempFile = `temp.${format}`,
        outFile = `out.${format}`;

      // write file to memory
      ffmpeg.FS('writeFile', tempFile, await fetchFile(blob));

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
        '-metadata',
        `title=${name}`,
        '-metadata',
        `artist=${artist}`,
        // '-codec', <======= makes mp3 corrupt
        // 'copy',
        outFile,
      );
      // Read the result
      const dataFile = ffmpeg.FS('readFile', outFile);

      const hrefUrl = window.URL.createObjectURL(new Blob([dataFile]));
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
  } catch (err) {
    alert(err);
  }
}
