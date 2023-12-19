import React from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCawlDetail } from '~/redux/apiRequest';
import classNames from 'classnames/bind';
import styles from './CawlDetail.module.scss';
const cx = classNames.bind(styles);
export default function CawlDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const jobDetailData = useSelector((state) => state.calw.jobs?.job); // Use the useSelector function

    useEffect(() => {
        getCawlDetail(id, dispatch);
        console.log(jobDetailData);
    }, []);

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
                            <Link to={`${jobDetailData?.webUrl}`}>
                                Website ứng tuyển
                            </Link>
                            <div className={cx('time')}>
                                <span className={cx('type-work-icons')}>
                                    <ion-icon
                                        name="time-outline"
                                        className={cx('time-icon')}
                                    ></ion-icon>
                                </span>
                                <span className={cx('end-day')}>
                                    Tạo ngày:{' '}
                                    {jobDetailData?.recruitmentStartDate}
                                </span>
                            </div>
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
                            <Link
                                className={cx('link')}
                                to={`${jobDetailData?.companyUrl}`}
                            >
                                <img src={jobDetailData?.imageUrl} alt="" />
                            </Link>
                            {/* <img
                        src={
                            jobDetailData?.recruiter_jobs?.imageUrl
                                ? jobDetailData?.imageUrl
                                : images.avatarDefault
                        }
                        alt={jobDetailData?.company}
                    /> */}
                            <div className={cx('time')}>
                                <span className={cx('end-day')}>
                                    {jobDetailData?.contractEmail}
                                </span>
                            </div>
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
                                                <span>Mức lương khởi điểm</span>
                                            </div>
                                            <span className={cx('type-detail')}>
                                                {jobDetailData?.salary}
                                            </span>
                                        </Col>
                                        <Col md={6} className={'mb-5'}>
                                            <div className={cx('type-work')}>
                                                <span
                                                    className={cx(
                                                        'type-work-icon',
                                                    )}
                                                >
                                                    <ion-icon name="cash-outline"></ion-icon>
                                                </span>
                                                <span>Mức lương tối đa</span>
                                            </div>
                                            <span className={cx('type-detail')}>
                                                {jobDetailData?.salary}
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
                                                {jobDetailData?.typeJob}
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
                                                {jobDetailData?.gender}
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
                                                {jobDetailData?.position}
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
                                                <span>Trình độ học vấn</span>
                                            </div>
                                            <span className={cx('type-detail')}>
                                                {jobDetailData?.education}
                                            </span>
                                        </Col>
                                        <Col md={6} className={'mb-5'}>
                                            <div className={cx('type-work')}>
                                                <span
                                                    className={cx(
                                                        'type-work-icon',
                                                    )}
                                                >
                                                    <ion-icon name="keypad-outline"></ion-icon>
                                                </span>
                                                <span>Thể loại ngành nghề</span>
                                            </div>
                                            <span className={cx('type-detail')}>
                                                {jobDetailData?.career}
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
                                                {jobDetailData?.experience}
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
                                    -{jobDetailData?.contractAddress}
                                </span>
                                <h2 className={cx('adress')}>
                                    Địa điểm chi tiết
                                </h2>
                                <span className={cx('address-detail')}>
                                    - {jobDetailData?.address}
                                </span>
                                <h2 className={cx('adress')}>
                                    Người đăng bài tuyển dụng
                                </h2>
                                <span className={cx('address-detail')}>
                                    - {jobDetailData?.contractName}
                                </span>
                                <h2 className={cx('adress')}>
                                    Số điện thoại liên lạc
                                </h2>
                                <span className={cx('address-detail')}>
                                    - {jobDetailData?.contractPhone}
                                </span>
                            </div>
                            <div className={cx('content-post')}>
                                <div className={cx('descript-job')}>
                                    <h1>Mô tả công việc</h1>
                                    <div className={cx('content-tab')}>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: jobDetailData?.description
                                                ,
                                            }}
                                        ></span>
                                    </div>
                                </div>
                                <div className={cx('descript-require')}>
                                    <h1>Yều cầu ứng viên</h1>
                                    <div className={cx('content-tab')}>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: jobDetailData?.skill,
                                            }}
                                        ></span>
                                    </div>
                                </div>
                                {/* <div className={cx('descript-benefit')}>
                                    <h1>Quyền lợi</h1>
                                    <div className={cx('content-tab')}>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: jobDetailData?.benefit,
                                            }}
                                        ></span>
                                    </div>
                                </div> */}
                                <div className={cx('mothod-title')}>
                                    <h1>Cách thức ứng tuyển</h1>
                                    <div className={cx('content-tab')}>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: jobDetailData?.contractNote,
                                            }}
                                        ></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
