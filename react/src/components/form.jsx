import React, {useState} from 'react';
import {validURL} from '../functions/validURL.js';

const serverFetch = async function (url, callback) {
  const promise = await fetch(`http://localhost:5000/info?url=${url}`, {
    method: 'GET',
  });
  const result = await promise.json();

  callback(result);

  //console.log('server:::', result.formats);
  //result.formats.map(format => console.log(format.qualityLabel + ' -- ' + format.itag));
};

export const Form = function (props) {
  const [link, setLink] = useState('');

  const handle_Change = e => setLink(e.target.value);
  const handle_Submit = e => {
    e.preventDefault();
    if (validURL(link)) {
      serverFetch(link, res => {
        if (res.hasOwnProperty('error')) {
          //error
          alert(res.error);
        } else {
          var filterFormat = [...res.formats];

          var mp4 = [],
            webm = [],
            mp3 = undefined;

          filterFormat.map(format => {
            if (
              format.container === 'mp4' &&
              !format.hasAudio &&
              !format.hasOwnProperty('colorInfo')
            ) {
              format.value = format.qualityLabel;
              mp4.push(format);
            } else if (format.container === 'webm' && format.hasVideo) {
              format.value = format.qualityLabel;
              webm.push(format);
            } else if (format.container === 'mp4' && format.hasAudio && !format.hasVideo) {
              console.log('is mp3!');
              format.value = format.audioBitrate;
              format.container = 'mp3';
              mp3 = format;
            }
          });

          mp4.sort((f1, f2) => f2.height - f1.height);
          webm.sort((f1, f2) => f2.height - f1.height);

          filterFormat = {mp3, mp4, webm};
          // console.log('res', res);
          // console.log('filterFormat', filterFormat);
          res.formats = filterFormat;

          props.addVideo(res);
        }
        setLink('');
      });
      //   const linkInput = new URL(link);

      //   if (linkInput.hostname === 'www.youtube.com') {
      //     const videoID = new URLSearchParams(linkInput.search).get('v');
      //     if (videoID) {
      //       //console.log(videoID);

      //     }
      //   } else alert('URL can only be from Youtube.com');
    } else alert('not a valid URL');
  };

  return (
    <div>
      <form id='add-video-form' onSubmit={handle_Submit}>
        <input
          type='text'
          placeholder='Enter Youtube-URL...'
          value={link}
          onChange={handle_Change}
        />
        <button>+ ADD</button>
      </form>
    </div>
  );
};
