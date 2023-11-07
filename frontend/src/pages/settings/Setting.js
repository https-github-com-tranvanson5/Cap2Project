import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Settings.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Loading from '~/components/Loading/Loading';
import { editProfile, getProfileUser } from '~/redux/apiRequest';
import { useState } from 'react';

const cx = classNames.bind(styles);

export default function Setting() {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(
        useSelector((state) => state.profile.user?.profileUser),
    );
    const loading = useSelector((state) => state.profile.users?.isFetching);
    const auth = useSelector((state) => state.auth.login?.currentUser);

    useEffect(() => {
        getProfileUser(auth.jwt, dispatch);
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        editProfile(auth?.jwt, dispatch, userData);
    };
    return (
        <>
            {loading === true ? <Loading /> : ''}
            <Container>
                <div className={cx('wrapper')} onSubmit={handleSubmit}>
                    <form>
                        <h1 className={cx('heading')}>Cài đặt</h1>
                        <h3 className={cx('settings-block-heading')}>
                            Thông tin cá nhân
                        </h3>
                        <Row>
                            <Col md={6} className={cx('left')}>
                                <div className={cx('content')}>
                                    <div className={cx('settings-block')}>
                                        <div className={cx('group')}>
                                            <div
                                                className={cx(
                                                    'form-group-lable',
                                                )}
                                            >
                                                Họ và tên
                                            </div>
                                            <input
                                                className={cx('input')}
                                                value={userData?.name}
                                                name="name"
                                                type="text"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={cx('group')}>
                                            <div
                                                className={cx(
                                                    'form-group-lable',
                                                )}
                                            >
                                                Email
                                            </div>

                                            <input
                                                value={userData?.email}
                                                className={cx('input')}
                                                name="email"
                                                type="email"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={cx('group')}>
                                            <div
                                                className={cx(
                                                    'form-group-lable',
                                                )}
                                            >
                                                Địa chỉ
                                            </div>
                                            <input
                                                value={userData?.address}
                                                className={cx('input')}
                                                name="address"
                                                type="text"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={cx('group')}>
                                            <div
                                                className={cx(
                                                    'form-group-lable',
                                                )}
                                            >
                                                Ngày tháng năm sinh
                                            </div>
                                            <input
                                                value={userData?.dob}
                                                className={cx('input')}
                                                name="dob"
                                                type="date"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={cx('group')}>
                                            <div
                                                className={cx(
                                                    'form-group-lable',
                                                )}
                                            >
                                                Giới tính
                                            </div>
                                            <input
                                                value={userData?.gender}
                                                className={cx('input')}
                                                type="text"
                                                name="gender"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className={cx('group')}>
                                            <div
                                                className={cx(
                                                    'form-group-lable',
                                                )}
                                            >
                                                Số điện thoại
                                            </div>
                                            <input
                                                value={userData?.phone}
                                                className={cx('input')}
                                                type="number"
                                                name="phone"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col
                                md={{ span: 4, offset: 2 }}
                                className={cx('right')}
                            >
                                <div>
                                    <div className={cx('input')}>
                                        {userData?.avatar}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </Container>
        </>
    );
}
