import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import styles from './Header.module.scss';
import images from '~/assets/images';
import config from '~/config';
import Button from '~/components/Button';
import UserOptions from './UserOptions';
import Navigation from './Navigation';

const cx = classNames.bind(styles);

function Header() {
    const [isVisibleUserOptions, serIsVisibleUserOptions] = useState(false);

    const user = useSelector((state) => state.auth.login?.currentUser);
    const isAuth = useSelector((state) => state.auth.login?.isFetching);
    const roleUser = user?.roles[0]?.authority;

    const toggleUserOptions = () => {
        serIsVisibleUserOptions(!isVisibleUserOptions);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('left')}>
                <Link to={config.routes.home}>
                    <img className={cx('logo')} src={images.logoM} alt="Logo" />
                </Link>
            </div>
            <div className={cx('center')}>
                <Navigation role={roleUser ? roleUser : 'ROLE_USER'} />
            </div>
            <div className={cx('right')}>
                {isAuth && user ? (
                    <>
                        <div className={cx('notification')}>
                            <ion-icon name="notifications-outline"></ion-icon>
                        </div>
                        <div
                            onClick={() => {
                                toggleUserOptions();
                            }}
                            className={cx('avatar')}
                        >
                            {user.imageUrl ? (
                                <img
                                    className={cx('avatar-img')}
                                    src={user.imageUrl}
                                    alt={user.imageUrl}
                                />
                            ) : (
                                <img
                                    className={cx('avatar-img')}
                                    src={images.avatarDefault}
                                    alt="Avatar"
                                />
                            )}
                            {isVisibleUserOptions ? (
                                <UserOptions user={user} />
                            ) : (
                                ''
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Button rounded to="/forBussiness">
                            Đăng tuyển
                        </Button>
                        <Button primary rounded to={config.routes.accounts}>
                            Đăng nhập
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
