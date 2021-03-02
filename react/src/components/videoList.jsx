import React from 'react';
import Video from './video';

export const VideoList = function (props) {
  return (
    <div id='videos-holder'>
      <ul>
        {props.videos.map((val, i) => (
          <Video
            title={val.title}
            index={i}
            thumbnail={val.thumbnail.url}
            href={val.url}
            delVideo={props.delVideo}
          />
        ))}
      </ul>
    </div>
  );
};
