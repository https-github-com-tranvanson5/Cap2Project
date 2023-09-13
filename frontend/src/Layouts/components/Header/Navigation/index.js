import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { memo } from 'react';

import styles from './Navigation.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

const navigationMenu = [
    {
        title: 'Tuyển dụng',
        to: config.routes.recruitmentpage,
        role: ['ROLE_USER'],
    },
    {
        title: 'Tuyển dụng',
        to: '/recruitment/recruiter',
        role: ['ROLE_PM'],
    },
    {
        title: 'Làm bài test',
        to: '/testuser',
        role: ['ROLE_USER'],
    },

    {
        title: 'Tạo CV',
        to: config.routes.cv,
        role: ['ROLE_USER'],
    },
    {
        title: 'Blog',
        to: config.routes.blog,
        role: ['ROLE_USER', 'ROLE_PM', 'ROLE_ADMIN'],
    },
    {
        title: 'Quản lý',
        to: config.routes.admin,
        role: ['ROLE_ADMIN'],
    },
    {
        title: 'Quản lý',
        to: config.routes.recruiter,
        role: ['ROLE_PM'],
    },
];

function Navigation({ role }) {
    const renderMenu = () => {
        return navigationMenu.map((option, index) => {
            const roleMenu = option.role.some((item) => item === role);
            if (roleMenu) {
                return (
                    <li key={index} className={cx('navigation-item')}>
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? cx('navigation-item-link', 'active')
                                    : cx('navigation-item-link')
                            }
                            to={option.to}
                        >
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
            <ul className={cx('navigation-list')}>{renderMenu()}</ul>
        </div>
    );
}

Navigation.propTypes = {
    role: PropTypes.string.isRequired,
};

export default memo(Navigation);
