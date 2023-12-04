import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { cvSlice } from '~/pages/CV/cvSlice';

import styles from './ColorControl.module.scss';

const cx = classNames.bind(styles);

function ColorItem({ color }) {
    const dispatch = useDispatch();

    const handleChangeColorTheme = () => {
        dispatch(cvSlice.actions.changeTheme(color));
    };

    return (
        <span
            onClick={handleChangeColorTheme}
            style={{ backgroundColor: color }}
            className={cx('color-item')}
        ></span>
    );
}

export default ColorItem;
