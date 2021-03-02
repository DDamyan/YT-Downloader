import {useRef, useState, useEffect} from 'react';
import externalLinkSvg from '../svg/symbol-fur-externen-link.svg';
import downloadSvg from '../svg/download.svg';

const Video = function (props) {
  const [hideDropdown, setHideDropdown] = useState(true);
  const showDropdown = () => {
    setHideDropdown(!hideDropdown);
  };

  useEffect(() => {
    const handle_OutsideClick = e => {
      if (!hideDropdown)
        if (e.target.closest('.extend-button') !== extendButtonRef.current) setHideDropdown(true);
    };

    document.addEventListener('mousedown', handle_OutsideClick);
    return () => {
      document.removeEventListener('mousedown', handle_OutsideClick);
    };
  }, [hideDropdown]);

  const extendButtonRef = useRef();

  const handleDelete = () => props.delVideo(props.index);

  const handleDownload = (url, name) => {
    window.open(`http://localhost:5000/download?url=${url}&name=${name}`);
  };

  return (
    <li key={props.index}>
      <img className='thumbnail' src={props.thumbnail} alt='thumbnail' />
      {props.title}
      <div ref={extendButtonRef} className='noselect extend-button' onClick={showDropdown}>
        <div className='extend-dots'>&#183;&#183;&#183;</div>
      </div>
      <div hidden={hideDropdown} className='extend-dropdown'>
        <div onClick={() => handleDelete()}>remove</div>
        <div>rename</div>
      </div>
      <a href={props.href} target='_blank' rel='noreferrer' className='noselect'>
        <img className='externalLink' src={externalLinkSvg} alt='Link' />
      </a>
      <div onClick={() => handleDownload(props.href, props.title)} className='download'>
        <img src={downloadSvg} alt='↓' />
        <div>Download</div>
      </div>
    </li>
  );
};

export default Video;
