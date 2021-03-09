import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function EditModal({isOpen, setIsOpen, title, artist, renameVideo}) {
  const [properties, setProperties] = useState({title: '', artist: ''});

  const handleChange = e => {
    setProperties({...properties, [e.target.name]: e.target.value});
  };

  const onOpen = () => setProperties({title: title, artist: artist});
  const closeModal = () => setIsOpen(false);
  const onSave = () => {
    renameVideo(properties.title, properties.artist);
    closeModal();
  };

  return (
    <Modal
      className='modal'
      overlayClassName='overlay'
      isOpen={isOpen}
      onAfterOpen={onOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <div className='title-wrapper'>
        <div>
          <strong>Title</strong>
        </div>
        <input type='text' name='title' value={properties.title} onChange={handleChange} />
      </div>
      <div className='artist-wrapper'>
        <div>
          <strong>Artist</strong>
        </div>
        <input type='text' name='artist' value={properties.artist} onChange={handleChange} />
      </div>
      <div className='button-wrapper'>
        <button onClick={() => closeModal()}>Close</button>
        <button className='save' onClick={onSave}>
          Save changes
        </button>
      </div>
    </Modal>
  );
}
