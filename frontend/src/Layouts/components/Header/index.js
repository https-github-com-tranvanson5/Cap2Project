import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import styles from './Header.module.scss';
import images from '~/assets/images';
import config from '~/config';
import Button from '~/components/Button';
import UserOptions from './UserOptions';
import Navigation from './Navigation';
import { getProfileUser } from '~/redux/apiRequest';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const [isVisibleUserOptions, serIsVisibleUserOptions] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.login?.currentUser);
    const user = useSelector((state) => state.profile.user?.profileUser);
    // const isAuth = useSelector((state) => state.auth.login?.isFetching);
    const roleUser = auth?.roles[0]?.authority;
    useEffect(() => {
        getProfileUser(auth?.jwt, dispatch);
    }, []);

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
                {user ? (
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
                            {user?.avatar ? (
                                <img
                                    className={cx('avatar-img')}
                                    src={user?.avatar}
                                    alt={user?.avatar}
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
