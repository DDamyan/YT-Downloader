import React, {useState, useRef} from 'react';
import onClickOutside from 'react-onclickoutside';
import '../style/dropdown.css';

function Dropdown({title = '', items = []}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const dropdownRef = useRef();
  const toggle = () => setOpen(!open);
  Dropdown.handleClickOutside = () => setOpen(false);

  function handleOnClick(item) {
    if (!selected.some(curr => curr.id === item.id)) {
      setSelected([item]);
    } else {
      //   let filterSelected = selected;
      //   filterSelected.filter(curr => curr.id !== item.id);
      //   setSelected([...filterSelected]);
      setSelected([]);
    }
  }

  function isItemSelected(item) {
    if (selected.find(curr => curr.id === item.id)) {
      return true;
    }
    return false;
  }

  return (
    <div className='dropdown-wrapper' ref={dropdownRef}>
      <div className='dropdown-button' onClick={() => toggle()}>
        {title}
      </div>
      <div className='dropdown'>
        {open && (
          <ul className='dropdown-contentlist'>
            {items.map(item => {
              var isSelected = isItemSelected(item) ? 'selected' : '';
              return (
                <li
                  key={item.id}
                  onClick={() => handleOnClick(item)}
                  className={`dropdown-content ${isSelected}`}
                >
                  {item.value}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default onClickOutside(Dropdown, {
  handleClickOutside: () => Dropdown.handleClickOutside,
});
