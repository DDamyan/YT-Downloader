import {useState, useEffect, useRef} from 'react';
import Dropdown from './formatDropdown';
import ReactTooltip from 'react-tooltip';
import {fetchFile} from '@ffmpeg/ffmpeg';

// import externalLinkSvg from '../svg/symbol-fur-externen-link.svg';
// import downloadSvg from '../svg/download.svg';
// import trashSvg from '../svg/rubbish-bin.svg';

var DDformats = [];

const Video = function (props) {
  const [selectedFormat, setSelectedFormat] = useState(null);

  const listRef = useRef();

  const handleDelete = () => props.delVideo(props.index);

  const handleDownload = async (url, name, itag, artist, fomEnd) => {
    try {
      if (itag <= 0) throw Error('plz select a format');

      const responce = await fetch(
        `http://localhost:5000/download?url=${url}&name=${name}&itag=${itag}&artist=${artist}`,
      );

      if (!responce.ok) throw Error('Something went fromg with the server fetch');

      const contentType = responce.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1)
        // JSON
        throw (await responce.json()).error;
      else {
        // FILE
        const blob = await responce.blob();

        // create GIF
        const {ffmpeg} = props;
        // var file = new File([blob], 'name');
        // write file to memory
        ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(blob));
        // Run the FFMpeg command
        await ffmpeg.run('-i', 'test.mp4', '-t', '2', '-ss', '2', '-f', 'gif', 'out.gif');
        // Read the result
        const dataFile = ffmpeg.FS('readFile', 'out.gif');

        console.log(dataFile.buffer);

        var HTML_GIF = document.createElement('img');
        HTML_GIF.setAttribute('width', '400');
        HTML_GIF.setAttribute('src', URL.createObjectURL(new Blob([dataFile.buffer])));
        HTML_GIF.setAttribute('alt', '__GIF__');
        document.querySelector('#root').appendChild(HTML_GIF);
      }
    } catch (err) {
      alert(err);
    }
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

  const setIndex = e => {
    document.querySelectorAll('.top-index').forEach(e => e.classList.remove('top-index'));

    const ele = listRef.current;
    ele.classList.add('top-index');
  };

  return (
    <li ref={listRef} onClick={setIndex} key={props.index}>
      <div className='left-section'>
        <img className='thumbnail' src={props.thumbnail} alt='thumbnail' />
        <div className='left-second-section'>
          <div className='title'>
            {props.videoArtist ? props.videoArtist + ' - ' : ''}
            {props.videoName}
          </div>
          <div className='options'>
            <a
              data-tip='Link'
              data-for={`link-tooltip-${props.index}`}
              href={props.href}
              target='_blank'
              rel='noreferrer'
              className='noselect'
            >
              {/* <img src={externalLinkSvg} alt='Link' /> */}
              <div className='icon-external-link'></div>
              <ReactTooltip
                id={`link-tooltip-${props.index}`}
                place='bottom'
                className='tooltip'
                effect='solid'
                textColor='#3e8acc'
                backgroundColor='#ffffff'
              />
            </a>
            <div
              data-tip='Remove'
              data-for={`delete-tooltip-${props.index}`}
              onClick={() => handleDelete()}
              className='delete-bttn-wrapper'
            >
              {/* <img src={trashSvg} alt='Delete' /> */}
              <div className='icon-bin'></div>
              <ReactTooltip
                id={`delete-tooltip-${props.index}`}
                place='bottom'
                className='tooltip'
                effect='solid'
                backgroundColor='#db524b'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='whole-download'>
        <div
          data-tip='Edit'
          data-for={`edit-tooltip-${props.index}`}
          className='edit'
          onClick={() => props.openModal()}
        >
          <div className='icon-pencil'></div>
          <ReactTooltip
            id={`edit-tooltip-${props.index}`}
            place='right'
            className='tooltip'
            effect='solid'
            backgroundColor='black'
          />
        </div>
        <Dropdown
          key={props.index}
          items={DDformats}
          setSelectedProp={setSelectedFormat}
          excludeScrollbar={true}
        />
        <div
          onClick={() =>
            handleDownload(
              props.href,
              props.videoName,
              selectedFormat?.itag,
              props.videoArtist,
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
