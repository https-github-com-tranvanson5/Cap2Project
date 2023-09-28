import classNames from 'classnames/bind';

import styles from './MenuItem.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, icon }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('menu-item')}>
                <span className={cx('icon')}>{icon}</span>
                <span className={cx('title')}>{title}</span>
            </div>
        </div>
    );
}

export default MenuItem;
