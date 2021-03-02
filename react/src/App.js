import React, {useState} from 'react';
import {Form} from './components/form.jsx';
import {VideoList} from './components/videoList.jsx';
import './style/index.css';
import './style/videos.css';
import './style/form.css';

import Dropdown from './components/dropdown';

const testItems = [
  {
    id: 111,
    value: 'first Value of all',
  },
  {
    id: 222,
    value: 'second!!!',
  },
  {
    id: 333,
    value: 'Hello, there :D',
  },
];

function App() {
  const [videos, setVideos] = useState([]);

  const addVideo = function (vid) {
    setVideos([...videos, vid]);
  };
  const delVideo = function (ind) {
    setVideos(videos.filter((_, index) => index !== ind));
  };

  return (
    <div>
      <Form addVideo={addVideo} />
      <React.StrictMode>
        <Dropdown title='Dropie' items={testItems} />
      </React.StrictMode>
      <VideoList videos={videos} delVideo={delVideo} />
    </div>
  );
}

export default App;
