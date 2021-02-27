import React, {useState} from 'react';
import {validURL} from '../functions/validURL.js';

const serverFetch = async function (URL, type) {
  const promise = await fetch(`http://localhost:5000/${type}?url=${URL}`, {
    method: 'GET',
  });
  const result = await promise.json();
  console.log(result);
};

const Form = function () {
  const [link, setLink] = useState('');

  const handle_Change = e => setLink(e.target.value);
  const handle_Submit = e => {
    e.preventDefault();
    serverFetch(link, 'info');
    // if (validURL(link)) {
    //   const linkInput = new URL(link);

    //   if (linkInput.hostname === 'www.youtube.com') {
    //     const videoID = new URLSearchParams(linkInput.search).get('v');
    //     if (videoID) {
    //       //console.log(videoID);

    //     }
    //   } else alert('URL can only be from Youtube.com');
    // } else alert('not a valid URL');
  };

  return (
    <div>
      <form onSubmit={e => handle_Submit(e)}>
        <input type='text' value={link} onChange={e => handle_Change(e)} />
        <button>Download</button>
      </form>
    </div>
  );
};

export default Form;
