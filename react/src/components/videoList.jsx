import React from 'react';
import externalLinkSvg from '../svg/symbol-fur-externen-link.svg';

export const VideoList = function (props) {
  const handle_Click = (e, url) => {
    window.open(url);
  };

  return (
    <div id='videos-holder'>
      <ul>
        {props.videos.map((val, i) => (
          <li key={i}>
            <img className='thumbnail' src={val.thumbnail.url} alt='thumbnail' />
            {val.title}
            <a href={val.url}>
              <img className='externalLink' src={externalLinkSvg} alt='Link' />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
