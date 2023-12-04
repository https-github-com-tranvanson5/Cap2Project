import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import styles from './SidebarLayout.module.scss';

const cx = classNames.bind(styles);

function SidebarLayout({ children }) {
    const user = useSelector((state) => state.auth.login?.currentUser);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar role={user?.roles[0]?.authority} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default SidebarLayout;
