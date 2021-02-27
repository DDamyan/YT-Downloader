import React, {useState} from 'react';
import {Form} from './components/form.jsx';
import {VideoList} from './components/videoList.jsx';
import './style/index.css';
import './style/videos.css';
import './style/form.css';

function App() {
  const [videos, setVideos] = useState([]);

  const addVideo = function (vid) {
    setVideos([...videos, vid]);
  };
  console.log(videos);
  return (
    <div>
      <Form addVideo={addVideo} />
      <VideoList videos={videos} />
    </div>
  );
}

export default App;
