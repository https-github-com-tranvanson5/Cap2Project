import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { roleSelector } from '~/redux/Selectors/authSelector';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import styles from './SidebarLayout.module.scss';

const cx = classNames.bind(styles);

function SidebarLayout({ children }) {
    const role = useSelector(roleSelector);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar role={role} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default SidebarLayout;
