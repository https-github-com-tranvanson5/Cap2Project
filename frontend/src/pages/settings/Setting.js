import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Settings.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Loading from '~/components/Loading/Loading';
import FormGroup from './FormGroup/FormGroup';
import FormUpload from './FormUpload/FormUpload';
import { getProfileUser } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

export default function Setting() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [userData, setUserData] = useState(
        useSelector((state) => state.users.users?.profileUser),
    );
    const loading = useSelector((state) => state.users.users?.isFetching);
    useEffect(() => {
        getProfileUser(user?.jwt, dispatch);
        setUserData();
    }, []);

    return (
        <>
            {loading === true ? <Loading /> : ''}
            <Container>
                <div className={cx('wrapper')}>
                    <h1 className={cx('heading')}>Cài đặt</h1>
                    <h3 className={cx('settings-block-heading')}>
                        Thông tin cá nhân
                    </h3>
                    <Row>
                        <Col md={6} className={cx('left')}>
                            <div className={cx('content')}>
                                <div className={cx('settings-block')}>
                                    <FormGroup
                                        label="Tên của bạn"
                                        type="text"
                                        value={userData?.name}
                                        desc="Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn."
                                    />
                                    <FormGroup
                                        label="Email"
                                        type="email"
                                        value={userData?.email}
                                        unUpdate
                                        desc="Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn."
                                    />
                                    <FormGroup
                                        label="Giới tính"
                                        type="text"
                                        value={userData?.gender}
                                    />
                                    <FormGroup
                                        label="Address"
                                        type="text"
                                        value={userData?.address}
                                    />
                                    <FormGroup
                                        label="Điện thoại"
                                        type="text"
                                        value={userData?.phone}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col
                            md={{ span: 4, offset: 2 }}
                            className={cx('right')}
                        >
                            <FormUpload
                                data={userData?.imageUrl}
                                label="Avatar"
                                desc="Ảnh đại diện của bạn sẽ xuất hiện bên cạnh tên của bạn."
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
}
