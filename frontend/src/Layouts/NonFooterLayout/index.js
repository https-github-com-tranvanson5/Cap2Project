import classNames from 'classnames/bind';

import Header from '../components/Header';
import styles from './NonFooterLayout.module.scss';

const cx = classNames.bind(styles);

function NonFooterLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default NonFooterLayout;
