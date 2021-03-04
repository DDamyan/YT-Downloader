import React, {useState} from 'react';
import onClickOutside from 'react-onclickoutside';
import NoSoundSVG from '../svg/no-sound.svg';
import '../style/dropdown.css';

function Dropdown({title = '', items = [], itagProp}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);

  function handleOnClick(item) {
    if (!selected.some(curr => curr.itag === item.itag)) {
      setSelected([item]);

      itagProp(item);
    } else {
      //   let filterSelected = selected;
      //   filterSelected.filter(curr => curr.id !== item.id);
      //   setSelected([...filterSelected]);
      setSelected([]);
      itagProp(0);
    }
  }

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

  return (
    <div className='dropdown-wrapper noselect'>
      <div className={`dropdown-button ${open ? 'open' : ''}`} onClick={() => toggle()}>
        {title}
      </div>
      <div className='dropdown'>
        {open && (
          <ul className='dropdown-contentlist'>
            {sortedItems.map(item => {
              const isSelected = isItemSelected(item) ? 'selected' : '';
              var categoryHTML = null;
              if (usedCategory.indexOf(item.category) === -1) {
                categoryHTML = <li className='dropdown-category'>{item.category}</li>;
                usedCategory.push(item.category);
              }
              return (
                <>
                  {categoryHTML}
                  <li
                    key={item.itag}
                    onClick={() => handleOnClick(item)}
                    className={`dropdown-content ${isSelected}`}
                  >
                    {item.value}
                    {item.noSound && <img className='no-sound' src={NoSoundSVG} alt='no sound' />}
                  </li>
                </>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default onClickOutside(Dropdown, {handleClickOutside: () => Dropdown.handleClickOutside});
