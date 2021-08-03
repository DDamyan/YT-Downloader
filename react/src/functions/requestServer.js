//import JSZip from 'jszip';
export async function requestAudio(url) {
  const response = await fetch(`http://localhost:5000/downloadAudio?url=${url}`);
  if (!response.ok) throw 'Something went wrong with the server fetch';

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.indexOf('application/json') !== -1)
    // JSON
    throw (await response.json()).error;
  else if (contentType) {
    // FILE
    //console.log(response);
    //debugger;
    return await response.blob();
  } else {
    throw 'Audio-Fetch went wrong';
  }
}

export async function requestVideo(url, itag) {
  if (itag <= 0 || typeof itag == 'undefined') throw 'plz select a format';

  const response = await fetch(`http://localhost:5000/download?url=${url}&itag=${itag}`);

  if (!response.ok) throw 'Something went wrong with the server fetch';

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.indexOf('application/json') !== -1)
    // JSON
    throw (await response.json()).error;
  else if (contentType) {
    // FILE
    return await response.blob();
  } else {
    throw 'Video-Fetch went wrong';
  }
  //}
}

export async function requestTest(url, name, itag, artist, format) {
  if (itag <= 0 || typeof itag == 'undefined') throw Error('plz select a format');

  //if (format === 'mp3') {
  //const response = await fetch(`http://localhost:5000/downloadAudio?url=${url}`);
  //if (!response.ok) throw Error('Something went fromg with the server fetch');

  //return await response.blob();

  /*const zip = new JSZip(); // <=========== ZIP-example
      zip.file(`${artist}-${name}.${format}`, blob);
      zip.generateAsync({type: 'blob'}).then(newBlob => {
        const hrefUrl = window.URL.createObjectURL(newBlob);
        var a = document.createElement('a');
        a.href = hrefUrl;
        a.download = `test.zip`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
      });*/

  /* DOWNLOAD-EXAMPLE
      const hrefUrl = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = hrefUrl;
      a.download = `${artist}-${name}.${format}`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
      */
  //} else {

  // const response = await fetch(`http://localhost:5000/download?url=${url}&itag=${itag}`);
  // //const audioResponse = await fetch(`http://localhost:5000/downloadAudio?url=${url}`);
  // // `http://localhost:5000/download?url=${url}&name=${name}&itag=${itag}&artist=${artist}`,

  // if (!response.ok) throw Error('Something went fromg with the server fetch');

  // const contentType = response.headers.get('Content-Type');
  // if (contentType && contentType.indexOf('application/json') !== -1)
  //   // JSON
  //   throw (await response.json()).error;
  // else if (contentType) {
  //   // FILE
  //   const blob = await response.blob();
  //   const audioBlob = await audioResponse.blob();
  //   //   const {ffmpeg} = props;
  //   const tempFile = `temp.${format}`,
  //     outFile = `out.${format}`;

  //   const audioTempFile = `temp.mp3`;

  //   // write file to memory
  //   ffmpeg.FS('writeFile', tempFile, await fetchFile(blob));
  //   ffmpeg.FS('writeFile', audioTempFile, await fetchFile(audioBlob));

  //   // Show Progress
  //   ffmpeg.setProgress(({ratio}) => {
  //     console.log(ratio);
  //     /*
  //      * ratio is a float number between 0 to 1.
  //      */
  //   });
  //   // Run the FFMpeg command
  //   await ffmpeg.run(
  //     '-y',
  //     '-i',
  //     tempFile,
  //     '-i',
  //     audioTempFile,
  //     //'-map',
  //     //'0:v:0',
  //     '-map',
  //     '0:v',
  //     '-map',
  //     '1:a',
  //     '-metadata',
  //     `title=${name}`,
  //     '-metadata',
  //     `artist=${artist}`,
  //     // '-codec',
  //     '-c:v',
  //     'copy',
  //     outFile,
  //   );
  //   // Read the result
  //   const dataFile = ffmpeg.FS('readFile', outFile);

  //   const hrefUrl = window.URL.createObjectURL(new Blob([dataFile.buffer], {type: 'video/mp4'}));
  //   var a = document.createElement('a');
  //   a.href = hrefUrl;
  //   a.download = `${artist}-${name}.${format}`;
  //   a.style.display = 'none';
  //   document.body.appendChild(a);
  //   a.click();
  //   a.remove();

  //   ffmpeg.FS('unlink', outFile);
  //   ffmpeg.FS('unlink', tempFile);
  // } else {
  //   throw 'Fetch went wrong';
  // }
  //}
}
