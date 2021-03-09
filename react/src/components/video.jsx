import {useState, useEffect} from 'react';
import Dropdown from './formatDropdown';
// import externalLinkSvg from '../svg/symbol-fur-externen-link.svg';
// import downloadSvg from '../svg/download.svg';
// import trashSvg from '../svg/rubbish-bin.svg';

var DDformats = [];

const Video = function (props) {
  const [selectedFormat, setSelectedFormat] = useState(null);

  const handleDelete = () => props.delVideo(props.index);

  const handleDownload = async (url, name, itag, artist, fomEnd) => {
    if (itag > 0) {
      //window.open(`http://localhost:5000/download?url=${url}&name=${name}&itag=${itag}`);
      // console.log(
      //   `http://localhost:5000/download?url=${url}&name=${name}&itag=${itag}&artist=${artist}`,
      //   fomEnd,
      // );

      const responce = await fetch(
        `http://localhost:5000/download?url=${url}&name=${name}&itag=${itag}&artist=${artist}`,
      );
      const blob = await responce.blob();

      const hrefUrl = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = hrefUrl;
      a.download = `${name}.${fomEnd}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else alert('plz select a format');
  };

  useEffect(() => {
    DDformats.splice(0, DDformats.length);
    props.formats.map(format => {
      if (format.hasAudio === false || format.hasVideo === false) {
        if (format.itag > 399 || format.itag < 394) {
          // doppelte av1-formate enfernen
          var container = format.container;
          if (format.hasVideo === false && format.hasAudio === true && format.container === 'mp4')
            container = 'mp3';
          DDformats.push({
            itag: format.itag,
            value: `${format.qualityLabel ?? format.audioBitrate + ' kbps'}`, // - ${format.hasAudio} //- ${format.itag}
            category: container,
            noSound: !format.hasAudio,
          });
        } //else {
        // console.log(format);
        //}
      }
      return null;
    });

    //console.log('after -->', DDformats);
  }, [props.formats]);

  return (
    <li key={props.index}>
      <div className='left-section'>
        <img className='thumbnail' src={props.thumbnail} alt='thumbnail' />
        <div className='left-second-section'>
          <div className='title'>
            {props.title}
            <div onClick={() => props.openModal()} className='icon-pencil'></div>
          </div>
          <div className='options'>
            <a href={props.href} target='_blank' rel='noreferrer' className='noselect'>
              {/* <img src={externalLinkSvg} alt='Link' /> */}
              <div className='icon-external-link'></div>
            </a>
            <div onClick={() => handleDelete()} className='delete-bttn-wrapper'>
              {/* <img src={trashSvg} alt='Delete' /> */}
              <div className='icon-bin'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='whole-download'>
        <Dropdown title='Format' items={DDformats} setSelectedProp={setSelectedFormat} />
        <div
          onClick={() =>
            handleDownload(
              props.href,
              props.title,
              selectedFormat?.itag,
              'artistNAME',
              selectedFormat?.category,
            )
          }
          className='download'
        >
          <div className='icon-download'></div>
          {/* <img src={downloadSvg} alt='↓' /> */}
          {/* <div>Download</div> */}
        </div>
      </div>
    </li>
  );
};

export default Video;
