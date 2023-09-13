import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import config from '~/config';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const sidebarMenu = [
    {
        title: 'Thống kê',
        to: config.routes.admin,
        role: ['ROLE_ADMIN'],
        icon: <ion-icon name="stats-chart-sharp"></ion-icon>,
    },
    {
        title: 'Người dùng',
        to: config.routes.usersManagement,
        role: ['ROLE_ADMIN'],
        icon: <ion-icon name="people-sharp"></ion-icon>,
    },
    {
        title: 'Blog',
        to: '/dashboard/blog',
        role: ['ROLE_ADMIN'],
        icon: <ion-icon name="book-sharp"></ion-icon>,
    },
    {
        title: 'Bài kiểm tra',
        to: '/dashboard/quiz',
        role: ['ROLE_ADMIN'],
        icon: <ion-icon name="create-sharp"></ion-icon>,
    },
    {
        title: 'Hợp tác',
        to: '/dashboard/quiz',
        role: ['ROLE_ADMIN'],
        icon: <ion-icon name="add-circle"></ion-icon>,
    },
    {
        title: 'Bảng tin',
        to: config.routes.recruiter,
        role: ['ROLE_PM'],
        icon: <ion-icon name="today"></ion-icon>,
    },
    {
        title: 'Đăng bài',
        to: config.routes.recruiterPostSidebar,
        role: ['ROLE_PM'],
        icon: <ion-icon name="duplicate"></ion-icon>,
    },
    {
        title: 'Quản lý CV',
        to: config.routes.recruiterManageCandidates,
        role: ['ROLE_PM'],
        icon: <ion-icon name="layers"></ion-icon>,
    },
    {
        title: 'Quản lý bài đăng',
        to: config.routes.recruiterPostManageSidebar,
        role: ['ROLE_PM'],
        icon: <ion-icon name="newspaper"></ion-icon>,
    },
    {
        title: 'Quản lý blog',
        to: '/dashboard/blog/listblog',
        role: ['ROLE_PM'],
        icon: <ion-icon name="library"></ion-icon>,
    },
    {
        title: 'Tuyển dụng',
        to: config.routes.saverecruitment,
        role: ['ROLE_USER'],
        icon: <ion-icon name="newspaper"></ion-icon>,
    },
    {
        title: 'Quiz',
        to: config.routes.savequiz,
        role: ['ROLE_USER'],
        icon: <ion-icon name="create-sharp"></ion-icon>,
    },
    {
        title: 'Blog',
        to: config.routes.saveblog,
        role: ['ROLE_USER'],
        icon: <ion-icon name="library"></ion-icon>,
    },
];

function Sidebar({ role }) {
    const renderMenu = () => {
        return sidebarMenu.map((option, index) => {
            const roleMenu = option.role.some((item) => item === role);
            if (roleMenu) {
                return (
                    <li key={index}>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? cx('sidebar-item-link', 'active')
                                    : cx('sidebar-item-link')
                            }
                            to={option.to}
                        >
                            <span className={cx('sidebar-item-link-icon')}>
                                {option.icon}
                            </span>
                            <span>{option.title}</span>
                        </NavLink>
                    </li>
                );
            }
            return '';
        });
    };

    return (
        <div className={cx('wrapper')}>
            <ul className={cx('sidebar-list')}>{renderMenu()}</ul>
        </div>
    );
}

export default Sidebar;
