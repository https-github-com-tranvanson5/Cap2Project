import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import FormGroup from './FormGroup/FormGroup';
import FormUpload from './FormUpload/FormUpload';
import {
    accountsDataSelector,
    isAuthSelector,
} from '~/redux/Selectors/authSelector';
import styles from './Settings.module.scss';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);

function Settings() {
    const isLoading = useSelector(isAuthSelector);
    const userData = useSelector(accountsDataSelector);

    return (
        <>
            {isLoading === 'pending' ? <Loading /> : ''}
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
                                        value={userData?.fullname}
                                        desc="Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn."
                                    />
                                    <FormGroup
                                        label="Email"
                                        type="email"
                                        value={userData.email}
                                        unUpdate
                                        desc="Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn."
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

export default Settings;
