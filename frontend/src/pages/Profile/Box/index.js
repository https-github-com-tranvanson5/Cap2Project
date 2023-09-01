import classNames from 'classnames/bind';

import styles from './Box.module.scss';

const cx = classNames.bind(styles);

function Box({ children, title }) {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>{title}</h4>
            <div className={cx('box-content')}>{children}</div>
        </div>
    );
}

export default Box;
