import React, {useState, useRef} from 'react';
import onClickOutside from 'react-onclickoutside';
import {CSSTransition} from 'react-transition-group';
//import NoSoundSVG from '../svg/no-sound.svg';
import '../style/dropdown.css';

function Dropdown({items = [], setSelectedProp}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const toggle = async () => {
    new Promise(resolve => resolve(setOpen(!open)));
    //changeViewport();
  };
  const contentlistRef = useRef();
  const [dropdownStyle, setDropdownStyle] = useState({top: '100%'});
  Dropdown.handleClickOutside = () => setOpen(false);

  function handleOnClick(item) {
    if (!selected.some(curr => curr.itag === item.itag)) {
      setSelected([item]);
      //itagProp(item);
      setSelectedProp(item);
      //console.log(item);
      setOpen(false);
    } else {
      //   let filterSelected = selected;
      //   filterSelected.filter(curr => curr.id !== item.id);
      //   setSelected([...filterSelected]);
      setSelectedProp(null);
      setSelected([]);
      //itagProp(0);
    }
  }

  const isOutOfViewPort = ele =>
    ele.bottom > (window.innerHeight || document.documentElement.clientHeight);

  const changeViewport = () => {
    if (!open) {
      const currPosition = contentlistRef.current.getBoundingClientRect();
      if (isOutOfViewPort(currPosition)) {
        setDropdownStyle({top: 'unset', bottom: '100%'});
      }
    } else {
      setDropdownStyle({top: '100%', bottom: 'unset'});
    }
  };

  function isItemSelected(item) {
    if (selected.find(curr => curr.itag === item.itag)) {
      return true;
    }
    return false;
  }

  const sortedItems = items.sort((a, b) => {
    if (a.category < b.category) return -1;
    if (a.category > b.category) return 1;
    return 0;
  });

  var usedCategory = [];
  const newCategory = item => {
    usedCategory.push(item.category);
    return <li className='dropdown-category'>{item.category}</li>;
  };

  return (
    <div className='dropdown-wrapper noselect'>
      <div
        className={`dropdown-button ${open ? 'open' : ''}`}
        onClick={() => toggle().then(() => changeViewport())}
      >
        {selected.length === 1
          ? `${selected[0].value} (${selected[0].category})`
          : 'Choose a format:'}
      </div>
      <div ref={contentlistRef} style={dropdownStyle} className='dropdown'>
        <CSSTransition in={open} timeout={300} classNames='cssDropdownAnimation'>
          <ul className='dropdown-contentlist'>
            {sortedItems.map(item => {
              const isSelected = isItemSelected(item) ? 'selected' : '';
              var categoryHTML = null;
              if (usedCategory.indexOf(item.category) === -1) {
                categoryHTML = newCategory(item);
              }
              return (
                <span key={item.itag + item.category}>
                  {categoryHTML}
                  <li
                    key={item.itag}
                    onClick={() => handleOnClick(item)}
                    className={`dropdown-content ${isSelected}`}
                  >
                    {item.value}
                    {/* {item.noSound && <img className='no-sound' src={NoSoundSVG} alt='no sound' />} */}
                  </li>
                </span>
              );
            })}
          </ul>
        </CSSTransition>
      </div>
    </div>
  );
}

export default onClickOutside(Dropdown, {handleClickOutside: () => Dropdown.handleClickOutside});
