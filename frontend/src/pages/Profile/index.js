import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { accountsDataSelector } from '~/redux/Selectors/authSelector';
import Box from './Box';
import BoxItem from './Box/BoxItem';
import styles from './Profile.module.scss';
import ProfileBanner from './ProfileBanner';

const cx = classNames.bind(styles);

function Profile() {
    const userData = useSelector(accountsDataSelector);

    const { fullname, imageUrl, email, address, phoneNumber, birth } = userData;

    return (
        <Container>
            <div className={cx('wrapper')}>
                <ProfileBanner username={fullname} avatarImg={imageUrl} />

                <Box title="Giới thiệu">
                    <BoxItem
                        icon={<ion-icon name="mail-outline"></ion-icon>}
                        content={email}
                    />
                    {address && (
                        <BoxItem
                            icon={<ion-icon name="location-outline"></ion-icon>}
                            content={address}
                        />
                    )}
                    {phoneNumber && (
                        <BoxItem
                            icon={<ion-icon name="call-outline"></ion-icon>}
                            content={phoneNumber}
                        />
                    )}
                    {birth && (
                        <BoxItem
                            icon={<ion-icon name="today-outline"></ion-icon>}
                            content={birth}
                        />
                    )}
                </Box>
            </div>
        </Container>
    );
}

export default Profile;
