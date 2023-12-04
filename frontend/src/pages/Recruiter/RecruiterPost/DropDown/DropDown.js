import React from 'react';
import classNames from 'classnames/bind';
import styles from './DropDown.module.scss';

const cx = classNames.bind(styles);

function DropDown({ data, defaultValueProps, onChange }) {
  const dataWithEmptyOption = [
    { value: '', name: '--- Chọn một tùy chọn ---' },
    ...data,
  ];

  return (
    <div className={cx('dropdown-container')}>
      <div className={cx('select-container')}>
        <select className={cx('dropdown')} value={defaultValueProps} onChange={onChange}>
          {dataWithEmptyOption.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DropDown;
