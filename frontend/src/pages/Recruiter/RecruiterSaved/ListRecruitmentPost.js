import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ListRecruitmentPost.module.scss';

import { Col, Container, Row } from 'react-bootstrap';
import Card from '~/components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import PaginationCOM from '~/pages/Home/BestRecruitment/pagination';

// import { fetchSavedRecruitments } from '~/pages/Accounts/accountsSlice';
import {getAllJobsRecruiter } from '~/redux/apiRequest';
import { _LIMIT_PAGE } from '~/config/api';
const cx = classNames.bind(styles);
function MainJob() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const jobListData = useSelector((state) => state.allJob.jobsRecruiter?.allJobsRecruiter);

    useEffect(() => {
        getAllJobsRecruiter(user?.jwt, dispatch);
    }, []);

    console.log(jobListData)

    return (
        <>
            <Container>
                <div className={cx('wrapper')}>
                    <h2 className={cx('heading')}>Những bài tuyển dụng bạn đã đăng</h2>
                    <div className={cx('wrapper')}>
                        <Row>
                            {jobListData &&
                                jobListData?.content.map((recruitment) => {
                                    return (
                                        <Col
                                            key={recruitment.id}
                                            lg={3}
                                            md={4}
                                            sm={6}
                                        >
                                            <Card
                                                data={recruitment}
                                                deleted={
                                                    <ion-icon name="trash-outline"></ion-icon>
                                                }
                                                titleDeleted="Xóa tin"
                                                repair={
                                                    <ion-icon name="pencil-outline"></ion-icon>
                                                }
                                                titleRepair="Sửa tin"
                                            ></Card>
                                        </Col>
                                    );
                                })}
                        </Row>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default MainJob;
