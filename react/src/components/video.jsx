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

  const handleDownload = async (url, name, itag, artist, format) => {
    try {
      if (itag <= 0 || typeof itag == 'undefined') throw Error('plz select a format');
      // TODO: merge video and audio to one !!! <-------------------------------------------------------------
      const response = await fetch(`http://localhost:5000/download?url=${url}&itag=${itag}`);
      // `http://localhost:5000/download?url=${url}&name=${name}&itag=${itag}&artist=${artist}`,

      if (!response.ok) throw Error('Something went fromg with the server fetch');

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.indexOf('application/json') !== -1)
        // JSON
        throw (await response.json()).error;
      else if (contentType) {
        // FILE
        const blob = await response.blob();
        // create GIF
        const {ffmpeg} = props;
        const tempFile = `temp.${format}`,
          outFile = `out.${format}`;
        // write file to memory
        ffmpeg.FS('writeFile', tempFile, await fetchFile(blob));

        // Show Progress
        ffmpeg.setProgress(({ratio}) => {
          console.log(ratio);
          /*
           * ratio is a float number between 0 to 1.
           */
        });
        // Run the FFMpeg command
        await ffmpeg.run(
          '-y',
          '-i',
          tempFile,
          '-metadata',
          `title=${name}`,
          '-metadata',
          `artist=${artist}`,
          '-codec',
          'copy',
          outFile,
        );
        // Read the result
        const dataFile = ffmpeg.FS('readFile', outFile);

        const hrefUrl = window.URL.createObjectURL(new Blob([dataFile]));
        var a = document.createElement('a');
        a.href = hrefUrl;
        a.download = `${artist}-${name}.${format}`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();

        ffmpeg.FS('unlink', outFile);
        ffmpeg.FS('unlink', tempFile);
      } else {
        throw 'Fetch went wrong';
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
