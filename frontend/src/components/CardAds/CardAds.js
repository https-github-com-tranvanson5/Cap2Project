import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CardAds.module.scss';
import images from '~/assets/images';
import config from '~/config';
import Button from '../Button';
const cx = classNames.bind(styles);
export default function CardAds({ to }) {
    return (
        <Container>
            <div className={cx('wrapper')}>
                <Row md={6} className={'mb-5'}>
                    <Col md={6} className={'mb-5'}>
                        <Link to={config.routes.cv}>
                            <div className={cx('box')}>
                                <div className={cx('box-title')}>
                                    <h2>Tạo CV ấn tượng</h2>
                                    <p>
                                        Jobcare hiện có 50+ mẫu CV chuyên
                                        nghiệp, độc đáo phù hợp với mọi ngành
                                        nghề.
                                    </p>
                                    <Button primary>Tạo CV ngay</Button>
                                </div>
                                <div className={cx('image')}>
                                    <img src={images.cvBox} alt="" />
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col md={6} className={'mb-5'}>
                        <Link to={config.routes.testuser}>
                            <div className={cx('box')}>
                                <div className={cx('box-title')}>
                                    <h2>Làm bài đánh giá năng lực bản thân</h2>
                                    <p>
                                        Làm bài test để ôn tập kiến thức của bản
                                        thân, tăng cơ hội thành công trong các
                                        cuộc phỏng vấn.
                                    </p>
                                    <Button primary>Làm ngay</Button>
                                </div>
                                <div className={cx('image')}>
                                    <img src={images.testBox} alt="" />
                                </div>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
