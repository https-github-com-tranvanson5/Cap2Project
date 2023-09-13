import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './DropDown.module.scss';

const cx = classNames.bind(styles);
const FunC = () => {};

export default function DropDown({
    data = [],
    onChangeSelect = FunC,
    title = '',
    defaultValueProps = '',
}) {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');

    const handleChangeSelect = (e) => {
        setValue(e.target.value);
        let index = e.nativeEvent.target.selectedIndex - 1;

        let nameValue = data[index].name;

        onChangeSelect(e.target.value, nameValue);
    };

    const renderDropDownData = () => {
        return (
            data.length > 0 &&
            data?.map((dropdown, index) => {
                return (
                    <option key={index} value={dropdown.value}>
                        &nbsp;{dropdown.name}
                    </option>
                );
            })
        );
    };
    return (
        <div
            onClick={() => {
                setVisible(!visible);
            }}
            className={cx('wrapper')}
        >
            <div className={cx('content')}>
                <select
                    onChange={handleChangeSelect}
                    className={cx('category')}
                    id="category"
                    tabIndex="-1"
                    aria-hidden="true"
                    defaultValue={defaultValueProps}
                >
                    <option value={defaultValueProps} selected disabled hidden>
                        {defaultValueProps || title}
                    </option>
                    {renderDropDownData()}
                </select>
            </div>
            {/* <span className={cx('icon')}>
                {visible ? (
                    <ion-icon name="chevron-down-outline"></ion-icon>
                ) : (
                    <ion-icon name="chevron-up-outline"></ion-icon>
                )}
            </span> */}
        </div>
    );
}
