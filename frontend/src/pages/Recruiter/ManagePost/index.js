import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from '../Post/Post.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function ManagePost() {
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col md={6} className={'mb-5'}>
                        <Link to={config.routes.ListRecruitmentPost}>
                            <div className={cx('control-block')}>
                                <span className={cx('icon')}>
                                    <ion-icon name="save-outline"></ion-icon>
                                </span>
                                <h3 className={cx('heading')}>
                                    Tin tuyển dụng của bạn
                                </h3>
                            </div>
                        </Link>
                    </Col>
                    <Col md={6} className={'mb-5'}>
                        <Link to={config.routes.ListRecruitmentPostBlock}>
                            <div className={cx('control-block')}>
                                <span className={cx('icon')}>
                                    <ion-icon name="save-outline"></ion-icon>
                                </span>
                                <h3 className={cx('heading')}>
                                    Tin tuyển dụng của bạn đã ẩn
                                </h3>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ManagePost;
