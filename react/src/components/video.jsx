import {useEffect, useRef, useState} from 'react';
import externalLinkSvg from '../svg/symbol-fur-externen-link.svg';

const Video = function (props) {
  const [hideDropdown, setHideDropdown] = useState(true);
  const showDropdown = () => {
    setHideDropdown(!hideDropdown);

    if (hideDropdown) {
      props.addRef({[props.index]: extendDropdownRef.current});
      //console.log('add');
    } else {
      //remove?
      //console.log('remove');
    }
  };

  const extendDropdownRef = useRef();

  //   useEffect(() => {
  //     props.addRef(extendDropdownRef.current);
  //     return () => {
  //       // remove from Parent-state
  //     };
  //   }, []);

  const handleDelete = () => props.delVideo(props.index);

  return (
    <li key={props.index}>
      <img className='thumbnail' src={props.thumbnail} alt='thumbnail' />
      {props.title}
      <div className='noselect extend-button' onClick={showDropdown}>
        <div className='extend-dots'>&#183;&#183;&#183;</div>
      </div>
      <div ref={extendDropdownRef} hidden={hideDropdown} className='extend-dropdown'>
        <div onClick={() => handleDelete()}>remove</div>
        <div>rename</div>
      </div>
      <a href={props.href} target='_blank' rel='noreferrer' className='noselect'>
        <img className='externalLink' src={externalLinkSvg} alt='Link' />
      </a>
    </li>
  );
};

export default Video;
