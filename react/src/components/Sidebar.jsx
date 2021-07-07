import React, {useState} from 'react';
import ReactTooltip from 'react-tooltip';

import AddModal from './addModal';

function SidebarElement(props) {
  var [isHover, setIsHover] = useState(false);
  var [modalIsOpen, setModalIsOpen] = useState(false);

  const hoverStyle = {
    transform: 'translateX(0%)',
    boxShadow: 'box-shadow: inset 0 0 100px 100px #ffffff',
    backgroundColor: props.hoverColor,
  };

  const handleClick = () => {
    setModalIsOpen(true);
  };

  return (
    <div>
      <props.toShow isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} />
      <div
        data-tip={props.title}
        data-for={`sidebar-${props.title}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className='sidebar-element'
        style={{backgroundColor: props.color, ...(isHover ? hoverStyle : '')}}
        onClick={handleClick}
      >
        <ReactTooltip
          id={`sidebar-${props.title}`}
          place='right'
          className='tooltip'
          effect='solid'
          backgroundColor={props.hoverColor}
          textColor={props.textColor}
        />
        <img
          src='https://static.thenounproject.com/png/534845-200.png'
          height='50'
          style={{margin: 20}}
        />
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <SidebarElement
        title='Add'
        color='#f5bf11'
        hoverColor='#efb701'
        textColor='#000000'
        toShow={AddModal}
      />
    </div>
  );
}
