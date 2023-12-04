import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CheckBox.module.scss';

const cx = classNames.bind(styles);

const CheckBox = ({ objects, onListIdChange, checked }) => {
  const [listId, setListId] = useState(checked);

  // Use useEffect to update the listId state when objectsIdInput changes
  useEffect(() => {
    setListId(checked);
  }, [checked]);

  const handleCheckboxChange = (id) => {
    let updatedListId;

    if (listId.includes(id)) {
      // If the id is already in the list, remove it
      updatedListId = listId.filter((item) => item !== id);
    } else {
      // If the id is not in the list, add it
      updatedListId = [...listId, id];
    }

    // Set the updated listId state
    setListId(updatedListId);

    // Pass the updated listId back to the parent using the callback function
    onListIdChange(updatedListId);
  };

  return (
    <div className={cx('checkbox-container')}>
      {objects?.map((object) => (
        <div key={object.id} className={cx('checkbox-row')}>
          <input
            type="checkbox"
            checked={listId.includes(object.id)}
            onChange={() => handleCheckboxChange(object.id)}
          />
          <div>{object.name}</div>
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
