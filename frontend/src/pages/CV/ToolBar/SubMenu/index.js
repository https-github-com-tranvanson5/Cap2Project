import classNames from 'classnames/bind';

import styles from './SubMenu.module.scss';

const cx = classNames.bind(styles);

function SubMenu({ children, title }) {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>{title}</span>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default SubMenu;
