import classNames from 'classnames/bind';

import styles from './Box.module.scss';

const cx = classNames.bind(styles);

function BoxItem({ icon, content }) {
    return (
        <div className={cx('box-item')}>
            <span className={cx('icon')}>{icon}</span>
            {content}
        </div>
    );
}

export default BoxItem;
