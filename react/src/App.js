import React, {useState} from 'react';
import {Form} from './components/form.jsx';
import {VideoList} from './components/videoList.jsx';
import './style/index.css';
import './style/videos.css';
import './style/form.css';
import './style/modal.css';

function App() {
  const [videos, setVideos] = useState([]);

  const addVideo = function (vid) {
    setVideos([...videos, vid]);
  };
  const delVideo = function (ind) {
    setVideos(videos.filter((_, index) => index !== ind));
  };
  const renameVideo = function (index, newName, newArtist) {
    var videosCopy = [...videos];
    var videoWithChanges = {...videos[index]};
    videoWithChanges.title = newName;
    videoWithChanges.artist = newArtist;
    videosCopy[index] = videoWithChanges;
    setVideos(videosCopy);
  };

  return (
    <div>
      <Form addVideo={addVideo} />
      <VideoList videos={videos} delVideo={delVideo} renameVideo={renameVideo} />
    </div>
  );
}

export default App;
