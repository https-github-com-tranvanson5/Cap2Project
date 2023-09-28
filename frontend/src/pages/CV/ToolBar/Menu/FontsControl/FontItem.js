import classNames from 'classnames/bind';

import styles from './FontsControl.module.scss';

const cx = classNames.bind(styles);

function FontItem({ name }) {
    return <div className={cx('wrapper')}>{name}</div>;
}

export default FontItem;
