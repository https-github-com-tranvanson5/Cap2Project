import React from 'react';
import classNames from 'classnames/bind';
import styles from './BlogController.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);
function BlogController() {
    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row>
                    <Col md={6} className={'mb-5'}>
                        <Link to={config.routes.postblog}>
                            <div className={cx('control-block')}>
                                <span className={cx('icon')}>
                                    <ion-icon name="newspaper-outline"></ion-icon>
                                </span>
                                <h3 className={cx('heading')}>Viết Blog</h3>
                            </div>
                        </Link>
                    </Col>
                    <Col md={6} className={'mb-5'}>
                        <Link to={config.routes.myblog}>
                            <div className={cx('control-block')}>
                                <span className={cx('icon')}>
                                    <ion-icon name="reader-outline"></ion-icon>
                                </span>
                                <h3 className={cx('heading')}>Blog của bạn</h3>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default BlogController;
