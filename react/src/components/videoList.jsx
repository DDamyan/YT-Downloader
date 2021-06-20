import React, {useState} from 'react';
import Video from './video';
import EditModal from './editModal';
import {requestAudio, requestVideo} from '../functions/requestServer';
import {fetchFile} from '@ffmpeg/ffmpeg';

export const VideoList = function (props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [startTitle, setStartTitle] = useState('');
  const [startArtist, setStartArtist] = useState('');
  const [videoIndex, setVideoIndex] = useState(null);

  const openModal = (index, title, artist) => {
    setVideoIndex(index);
    setStartTitle(title);
    setStartArtist(artist);
    setModalIsOpen(true);
  };

  const saveFile = (name, blob) => {
    const hrefUrl = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = hrefUrl;
    a.download = name;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDownload = async (url, name, itag, artist, format) => {
    try {
      var fileName = `${artist}-${name}.${format}`;
      if (!artist) fileName = `${name}.${format}`;

      if (format === 'mp3') {
        const blob = await requestAudio(url);
        // EDIT METADATA
        saveFile(fileName, blob);
      } else {
        const blob = await requestVideo(url, itag);
        // FFMpeg edit !!!
        saveFile(fileName, blob);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div id='videos-holder'>
      <EditModal
        isOpen={modalIsOpen}
        artist={startArtist}
        title={startTitle}
        renameVideo={(newName, newArtist) => props.renameVideo(videoIndex, newName, newArtist)}
        setIsOpen={setModalIsOpen}
      />
      <ul>
        {props.videos.map((val, i) => (
          <Video
            key={val.videoId + i}
            videoName={val.title}
            videoArtist={val.artist}
            index={i}
            thumbnail={val.thumbnail.url}
            formats={val.formats}
            href={val.url}
            delVideo={props.delVideo}
            openModal={() => openModal(i, val.title, val.artist)}
            // renameVideo={(newName, newArtist) => props.renameVideo(i, newName, newArtist)}
            // ffmpeg={props.ffmpeg}
            /*handleDownload={(url, name, itag, artist, format) =>
              requestServer(props.ffmpeg, url, name, itag, artist, format)
            }*/
            handleDownload={handleDownload}
          />
        ))}
      </ul>
    </div>
  );
};
