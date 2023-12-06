import React from 'react';
import images from '~/assets/images';
import styles from './UserComments.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const UserComments = ({ name, body, createdAt }) => {
    return (
        <div>
            <div className={cx('wrapper')}>
                <div >
                    <img src={images.avatarDefault} className={cx('media-left')} alt="Avatar" />
                </div>
                <div className={cx('media-body')}>
                    <h3 className={cx('body')}>
                        {name}{' '}
                        <small>{createdAt.toDate().toDateString()}</small>
                    </h3>
                    <p className={cx('text-start')}>{body}</p>
                </div>
            </div>
        </div>
    );
};

export default UserComments;
