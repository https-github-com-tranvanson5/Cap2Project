import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Post.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function Post() {
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col md={6} className={'mb-5'}>
                        <Link to={config.routes.recruiterpost}>
                            <div className={cx('control-block')}>
                                <span className={cx('icon')}>
                                    <ion-icon name="newspaper-outline"></ion-icon>
                                </span>
                                <h3 className={cx('heading')}>
                                    Đăng bài tuyển dụng
                                </h3>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Post;
