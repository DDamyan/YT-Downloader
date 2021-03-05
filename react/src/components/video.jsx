import {useRef, useState, useEffect} from 'react';
import Dropdown from './dropdown';
import externalLinkSvg from '../svg/symbol-fur-externen-link.svg';
import downloadSvg from '../svg/download.svg';

const Video = function (props) {
  const [hideDropdown, setHideDropdown] = useState(true);
  const [Itag, setItag] = useState(0);

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

  const handleDownload = (url, name, itag) => {
    if (itag > 0) {
      //window.open(`http://localhost:5000/download?url=${url}&name=${name}&itag=${itag}`);
      //console.log(`http://localhost:5000/download?url=${url}&name=${name}&itag=${itag}`);
      testFetch();
    } else alert('plz select a format');
  };

  const testFetch = async () => {
    const responce = await fetch(
      'http://localhost:5000/download?url=https://www.youtube.com/watch?v=RUQl6YcMalg&name=Billie Eilish - Therefore I Am (Official Music Video)&itag=140',
    );
    const blob = await responce.blob();

    // const reader = responce.body.pipeThrough(new TextDecoderStream()).getReader();

    // while (true) {
    //   const {value, done} = await reader.read();
    //   if (done) break;
    //   console.log('Received', value);
    // }
  };

  var DDformats = [];
  props.formats.map(format => {
    if (format.hasVideo === false && format.hasAudio === true && format.container === 'mp4')
      format.container = 'mp3';
    DDformats.push({
      itag: format.itag,
      value: `${format.qualityLabel ?? format.audioBitrate + ' kbps'}`, // - ${format.hasAudio}
      category: format.container,
      noSound: !format.hasAudio,
    });
    return null;
  });

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
      <Dropdown title='Format' items={DDformats} itagProp={setItag} />
      <div onClick={() => handleDownload(props.href, props.title, Itag.itag)} className='download'>
        <img src={downloadSvg} alt='↓' />
        <div>Download</div>
      </div>
    </li>
  );
};

export default Video;
