import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BoxHeader.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Modal from '~/components/Modal/ModalCv/ModalCv';

import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// window.scroll = function () {
//     console.log(document.body.scroll);
// };

// window.scroll = function () {
//     console.log(document.body.scroll);
// };

const cx = classNames.bind(styles);

export default function BoxHeader({ data, to }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <Container>
            <div className={cx('wrapper')}>
                <div className={cx('box')}>
                    {/* <div className={cx('title')}>{data?.title}</div> */}
                    <div className={cx('box-left')}>
                        <div className={cx('title')}>
                            <h2 className={cx('title-header')}>
                                {data?.title}
                                <span>
                                    <ion-icon
                                        name="checkmark-circle-outline"
                                        className={cx('check-icon')}
                                    ></ion-icon>
                                </span>
                            </h2>
                        </div>
                        <h3 className={cx('company-name')}>
                            Công ty công nghệ BAP
                        </h3>
                        <div className={cx('time')}>
                            <span>
                                <ion-icon
                                    name="time-outline"
                                    className={cx('time-icon')}
                                ></ion-icon>
                            </span>
                            <span>Hạn nộp hồ sơ: {data?.createAt}</span>
                        </div>
                    </div>
                    <div className={cx('box-logo')}>
                        <img src={images.CV} alt="" />
                    </div>
                </div>
                <div className={cx('content-detail')}>
                    <div className={cx('recruitment-detail')}>
                        <div className={cx('detail')}>
                            <div className={cx('detail-require')}>
                                <h2 className={cx('adress')}>
                                    Chi tiết tuyển dụng
                                </h2>
                                <Row>
                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('type-work')}>
                                            <span>
                                                <ion-icon name="cash-outline"></ion-icon>
                                            </span>
                                            <span>Mức lương</span>
                                        </div>
                                        <span className={cx('type-detail')}>
                                            {data?.salary}
                                        </span>
                                    </Col>
                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('type-work')}>
                                            <span>
                                                <ion-icon name="people-outline"></ion-icon>
                                            </span>
                                            <span>Số lượng người</span>
                                        </div>
                                        <span className={cx('type-detail')}>
                                            {data?.amount}
                                        </span>
                                    </Col>
                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('type-work')}>
                                            <span>
                                                <ion-icon name="time-outline"></ion-icon>
                                            </span>
                                            <span>Hình thức làm việc</span>
                                        </div>
                                        <span className={cx('type-detail')}>
                                            {data?.typeWork}
                                        </span>
                                    </Col>
                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('type-work')}>
                                            <span>
                                                <ion-icon name="female-outline"></ion-icon>
                                            </span>
                                            <span>Giới tính</span>
                                        </div>
                                        <span className={cx('type-detail')}>
                                            {data?.gender}
                                        </span>
                                    </Col>
                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('type-work')}>
                                            <span>
                                                <ion-icon name="podium-outline"></ion-icon>
                                            </span>
                                            <span>Cấp bậc</span>
                                        </div>
                                        <span className={cx('type-detail')}>
                                            {data?.level}
                                        </span>
                                    </Col>
                                    <Col md={6} className={'mb-5'}>
                                        <div className={cx('type-work')}>
                                            <span>
                                                <ion-icon name="accessibility-outline"></ion-icon>
                                            </span>
                                            <span>Kinh nghiệm</span>
                                        </div>
                                        <span className={cx('type-detail')}>
                                            {data?.experience}
                                        </span>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className={cx('location')}>
                            <h2 className={cx('adress')}>Địa điểm làm việc</h2>
                            <span className={cx('address-detail')}>
                                - {data?.location}
                            </span>
                        </div>
                        <div className={cx('content-post')}>
                            <div className={cx('descript-job')}>
                                <h1>Mô tả công việc</h1>
                                <div className={cx('content-tab')}>
                                    <p>{data?.jobDescription}wwwwwwwwwwwwww</p>
                                </div>
                            </div>
                            <div className={cx('descript-require')}>
                                <h1>Yều cầu ứng viên</h1>
                                <div className={cx('content-tab')}>
                                    <p>{data?.jobRequire}</p>
                                </div>
                            </div>
                            <div className={cx('descript-benefit')}>
                                <h1>Quyền lợi</h1>
                                <div className={cx('content-tab')}>
                                    <p>{data?.welFare}</p>
                                </div>
                            </div>
                            <div className={cx('mothod-title')}>
                                <h2>Cách thức ứng tuyển</h2>
                            </div>
                            <div className={cx('btn-post')}>
                                <div className={cx('btn-save')}>
                                    <Button rounded>Lưu tin</Button>
                                </div>
                                <div className={cx('btn-apply')}>
                                    <Button
                                        primary
                                        className={cx('btn-submit')}
                                        onClick={() => {
                                            setModalOpen(true);
                                        }}
                                    >
                                        Ứng tuyển ngay
                                    </Button>
                                    {/* {modalOpen && (
                                        <Modal setOpenModal={setModalOpen} />
                                    )} */}
                                </div>
                            </div>
                            <div className={cx('time')}>
                                <span>
                                    <ion-icon name="time-outline"></ion-icon>
                                </span>
                                <span>Hạn nộp hồ sơ: {data?.endDay}</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('detail-ads')}>
                        <Link className={cx('link')} to={to}>
                            <img src={images.CV} alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
}
