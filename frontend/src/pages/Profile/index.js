import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Box from './Box';
import BoxItem from './Box/BoxItem';
import styles from './Profile.module.scss';
import ProfileBanner from './ProfileBanner';
import { getProfileUser } from '~/redux/apiRequest';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.profile.user?.profileUser);
    const auth = useSelector((state) => state.auth.login?.currentUser);
    // const isAuth = useSelector((state) => state.auth.login?.isFetching);
    useEffect(() => {
        getProfileUser(auth.jwt, dispatch);
    }, []);


    return (
        <Container>
            <div className={cx('wrapper')}>
                <ProfileBanner username={user?.name} avatarImg={user?.avatar} />

                <Box title="Giới thiệu">
                    <BoxItem
                        icon={<ion-icon name="mail-outline"></ion-icon>}
                        content={user?.email}
                    />
                    {user?.address && (
                        <BoxItem
                            icon={<ion-icon name="location-outline"></ion-icon>}
                            content={user?.address}
                        />
                    )}
                    {user?.phone && (
                        <BoxItem
                            icon={<ion-icon name="call-outline"></ion-icon>}
                            content={user?.phone}
                        />
                    )}
                    {user?.dob && (
                        <BoxItem
                            icon={<ion-icon name="today-outline"></ion-icon>}
                            content={user?.dob}
                        />
                    )}
                </Box>
            </div>
        </Container>
    );
}

export default Profile;
