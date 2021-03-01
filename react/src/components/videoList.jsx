import React, {useEffect, useState} from 'react';
import Video from './video';

export const VideoList = function (props) {
  const [dropdownRefs, setDropdownRefs] = useState({});

  const addDropdownRef = ref => {
    console.log('add');
    setDropdownRefs({...dropdownRefs, ref});
  };

  useEffect(() => {
    function handleClickOutside(e) {
      //if (dropdownRefs.length > 0) {
      console.log(dropdownRefs);
      // if (e.target.closest('div.' + dropdownRefs.className).length === 0) {
      //   console.log('HIDE!!!');
      // }
      //}
      // console.dir(dropdownRefs);
      // if (dropdownRefs.findIndex(el => el === e.target.parentElement) > -1) {
      //   console.log('__________________');
      // }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            addRef={addDropdownRef}
          />
        ))}
      </ul>
    </div>
  );
};
