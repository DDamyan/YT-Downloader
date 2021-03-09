import React, {useState} from 'react';
import Video from './video';
import EditModal from './editModal';

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
            key={val.url}
            title={`${val.artist} - ${val.title}`}
            index={i}
            thumbnail={val.thumbnail.url}
            formats={val.formats}
            href={val.url}
            delVideo={props.delVideo}
            openModal={() => openModal(i, val.title, val.artist)}
            // renameVideo={(newName, newArtist) => props.renameVideo(i, newName, newArtist)}
          />
        ))}
      </ul>
    </div>
  );
};
