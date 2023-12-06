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
                            <Link to={`${jobDetailData?.companyLink}`}>
                                Website doanh nghiệp
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
                                to={`${jobDetailData?.companyLink}`}
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
                                    {jobDetailData?.contactEmail}
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
                                                {jobDetailData?.startSalary}
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
                                        {/* <Col md={6} className={'mb-5'}>
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
                                        {getNameByValueEducation(
                                            jobDetailData?.jobEducation,
                                        )}
                                    </span>
                                </Col> */}
                                        {/* <Col md={6} className={'mb-5'}>
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
                                        {carrerDetailName}
                                    </span>
                                </Col> */}
                                        {/* <Col md={6} className={'mb-5'}>
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
                                        {getNameByValueExp(
                                            jobDetailData?.jobExperience,
                                        )}
                                    </span>
                                </Col> */}
                                    </Row>
                                </div>
                            </div>
                            <div className={cx('location')}>
                                <h2 className={cx('adress')}>
                                    Địa điểm làm việc
                                </h2>
                                <span className={cx('address-detail')}>
                                    -{jobDetailData?.contactAddress}
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
                                    - {jobDetailData?.contactName}
                                </span>
                                <h2 className={cx('adress')}>
                                    Số điện thoại liên lạc
                                </h2>
                                <span className={cx('address-detail')}>
                                    - {jobDetailData?.contactPhone}
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
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
