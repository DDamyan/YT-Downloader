import React, {useState} from 'react';
import Sidebar from './components/Sidebar';
import {VideoList} from './components/videoList.jsx';
import {createFFmpeg} from '@ffmpeg/ffmpeg';
import './style/index.css';

const ffmpeg = createFFmpeg(); //{log: true}

function App() {
  const [videos, setVideos] = useState([]);
  const [ffmpegReady, setFfmpegReady] = useState(true); // <==== false

  const ffmpagLoad = async () => {
    //await ffmpeg.load();
    setFfmpegReady(true);
  };

  React.useEffect(() => {
    const data = localStorage.getItem('video-list');
    if (data) {
      setVideos(JSON.parse(data));
      console.log(JSON.parse(data));
      // const KOK = JSON.parse(data);
      // console.log(
      //   KOK[0].formats.map(
      //     val =>
      //       val.hasAudio +
      //       ' -- ' +
      //       val.itag +
      //       ' -- ' +
      //       val.qualityLabel +
      //       '/' +
      //       val.hasVideo +
      //       ' -- ' +
      //       val.container,
      //   ),
      // );
    }

    ffmpagLoad();
  }, []);

  React.useEffect(() => {
    localStorage.setItem('video-list', JSON.stringify(videos));
  });

  const addVideo = function (vid) {
    setVideos([vid, ...videos]);
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

  return ffmpegReady ? (
    <div>
      <Sidebar addVideo={addVideo} />
      <VideoList videos={videos} delVideo={delVideo} renameVideo={renameVideo} ffmpeg={ffmpeg} />
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default App;
