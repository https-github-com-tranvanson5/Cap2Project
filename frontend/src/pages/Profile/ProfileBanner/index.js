import classNames from 'classnames/bind';

import images from '~/assets/images';
import styles from './ProfileBanner.module.scss';

const cx = classNames.bind(styles);

function ProfileBanner({ username, avatarImg }) {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('background')}
                src={images.backgroundAccounts}
                alt="background"
            />
            <div className={cx('user-profile')}>
                {avatarImg ? (
                    <img
                        className={cx('avatar-img')}
                        src={avatarImg}
                        alt="avatar"
                    />
                ) : (
                    <img
                        className={cx('avatar-img')}
                        src="https://fullstack.edu.vn/static/media/cover-profile.3fb9fed576da4b28386a.png"
                        alt="avatar"
                    />
                )}

                <span className={cx('user-name')}>{username}</span>
            </div>
        </div>
    );
}

export default ProfileBanner;
