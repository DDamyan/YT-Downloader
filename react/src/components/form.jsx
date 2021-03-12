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
        props.addVideo(res);
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
        <input type='text' value={link} onChange={handle_Change} />
        <button>+ ADD</button>
      </form>
    </div>
  );
};
