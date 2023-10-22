import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './DetailInfor.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Modal from '~/components/Modal/ModalCv/ModalCv';
import config from '~/config';
import { getJob } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

export default function DetailInfor({ data }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const jobDetailData = useSelector((state) => state.allJob.jobs?.job);

    useEffect(() => {
        getJob(dispatch, id);
    }, []);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <>
            <Container>
                <div className={cx('wrapper')}>
                    <div className={cx('box')}>
                        {/* <div className={cx('title')}>{data?.title}</div> */}
                        <div className={cx('box-left')}>
                            <div className={cx('title')}>
                                <h2 className={cx('title-header')}>
                                    {jobDetailData?.title}
                                </h2>
                            </div>
                            <h3 className={cx('company-name')}>
                                {jobDetailData?.company}
                            </h3>
                            <div className={cx('time')}>
                                <span className={cx('type-work-icons')}>
                                    <ion-icon
                                        name="time-outline"
                                        className={cx('time-icon')}
                                    ></ion-icon>
                                </span>
                                <span className={cx('end-day')}>
                                    Hạn nộp hồ sơ:{' '}
                                    {jobDetailData?.recruitmentEndDate}
                                </span>
                            </div>
                        </div>
                        <div className={cx('box-logo')}>
                            <img
                                src={
                                    jobDetailData?.recruiter_jobs?.imageUrl
                                        ? jobDetailData?.imageUrl
                                        : images.avatarDefault
                                }
                                alt={jobDetailData?.company}
                            />
                            {/* <img src={images.CV} alt="" /> */}
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
                                                <span
                                                    className={cx(
                                                        'type-work-icon',
                                                    )}
                                                >
                                                    <ion-icon name="cash-outline"></ion-icon>
                                                </span>
                                                <span>Mức lương</span>
                                            </div>
                                            <span className={cx('type-detail')}>
                                                {jobDetailData?.endSalary}
                                            </span>
                                        </Col>
                                        <Col md={6} className={'mb-5'}>
                                            <div className={cx('type-work')}>
                                                <span
                                                    className={cx(
                                                        'type-work-icon',
                                                    )}
                                                >
                                                    <ion-icon name="people-outline"></ion-icon>
                                                </span>
                                                <span>Số lượng người</span>
                                            </div>
                                            <span className={cx('type-detail')}>
                                                {jobDetailData?.jobStatus}
                                            </span>
                                        </Col>
                                        <Col md={6} className={'mb-5'}>
                                            <div className={cx('type-work')}>
                                                <span
                                                    className={cx(
                                                        'type-work-icon',
                                                    )}
                                                >
                                                    <ion-icon name="time-outline"></ion-icon>
                                                </span>
                                                <span>Hình thức làm việc</span>
                                            </div>
                                            <span className={cx('type-detail')}>
                                                {jobDetailData?.jobType}
                                            </span>
                                        </Col>
                                        <Col md={6} className={'mb-5'}>
                                            <div className={cx('type-work')}>
                                                <span
                                                    className={cx(
                                                        'type-work-icon',
                                                    )}
                                                >
                                                    <ion-icon name="female-outline"></ion-icon>
                                                </span>
                                                <span>Giới tính</span>
                                            </div>
                                            <span className={cx('type-detail')}>
                                                {jobDetailData?.genderRequest}
                                            </span>
                                        </Col>
                                        <Col md={6} className={'mb-5'}>
                                            <div className={cx('type-work')}>
                                                <span
                                                    className={cx(
                                                        'type-work-icon',
                                                    )}
                                                >
                                                    <ion-icon name="podium-outline"></ion-icon>
                                                </span>
                                                <span>Cấp bậc</span>
                                            </div>
                                            <span className={cx('type-detail')}>
                                                {jobDetailData?.jobPosition}
                                            </span>
                                        </Col>
                                        <Col md={6} className={'mb-5'}>
                                            <div className={cx('type-work')}>
                                                <span
                                                    className={cx(
                                                        'type-work-icon',
                                                    )}
                                                >
                                                    <ion-icon name="accessibility-outline"></ion-icon>
                                                </span>
                                                <span>Kinh nghiệm</span>
                                            </div>
                                            <span className={cx('type-detail')}>
                                                {jobDetailData?.jobExperience}
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div className={cx('location')}>
                                <h2 className={cx('adress')}>
                                    Địa điểm làm việc
                                </h2>
                                <span className={cx('address-detail')}>
                                    - {jobDetailData?.contactAddress}
                                </span>
                            </div>
                            <div className={cx('content-post')}>
                                <div className={cx('descript-job')}>
                                    <h1>Mô tả công việc</h1>
                                    <div className={cx('content-tab')}>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: jobDetailData?.jobDescription,
                                            }}
                                        ></span>
                                    </div>
                                </div>
                                <div className={cx('descript-require')}>
                                    <h1>Yều cầu ứng viên</h1>
                                    <div className={cx('content-tab')}>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: jobDetailData?.skillDescription,
                                            }}
                                        ></span>
                                    </div>
                                </div>
                                <div className={cx('descript-benefit')}>
                                    <h1>Quyền lợi</h1>
                                    <div className={cx('content-tab')}>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: jobDetailData?.benefit,
                                            }}
                                        ></span>
                                    </div>
                                </div>
                                <div className={cx('mothod-title')}>
                                    <h2>Cách thức ứng tuyển</h2>
                                </div>
                                <div className={cx('btn-post')}>
                                    <Button
                                        primary
                                        className={cx('btn-submit')}
                                        onClick={() => {
                                            setModalOpen(true);
                                        }}
                                    >
                                        Ứng tuyển ngay
                                    </Button>
                                    <Button
                                        secondary
                                        className={cx('btn-saved')}
                                    >
                                        Lưu tin
                                    </Button>

                                    {modalOpen && (
                                        <Modal
                                            data={jobDetailData}
                                            setOpenModal={setModalOpen}
                                        />
                                    )}
                                </div>
                                <div className={cx('time')}>
                                    <span>
                                        Hạn nộp hồ sơ: {jobDetailData?.endDay}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('detail-ads')}>
                            <Link className={cx('link')} to={config.routes.cv}>
                                <img src={images.CV} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
