import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ListRecruitmentPost.module.scss';

import { Col, Container, Row } from 'react-bootstrap';
import Card from '~/components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';

// import { fetchSavedRecruitments } from '~/pages/Accounts/accountsSlice';
import {deleteJobRecruiter, getAllJobsRecruiter } from '~/redux/apiRequest';
import { _LIMIT_PAGE } from '~/config/api';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
function MainJob() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const jobListData = useSelector((state) => state.allJob.jobsRecruiter?.allJobsRecruiter);

    useEffect(() => {
        getAllJobsRecruiter(user?.jwt, dispatch);
    }, []);

    const filteredApplyJob = jobListData?.content.filter((obj1) => {
        return obj1.jobStatus === 'ACTIVE';
    });

    console.log('filter id' ,filteredApplyJob)

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có muốn xóa bài tuyển dụng này ?')) {
            try {
                await deleteJobRecruiter(user?.jwt , dispatch , id , 'DELETE')
                toast.success('Bài tuyển dụng đã được xóa');
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleBlock = async (id) => {
        if (window.confirm('Bạn có muốn ẩn bài tuyển dụng này ?')) {
            try {
                await deleteJobRecruiter(user?.jwt , dispatch , id , 'BLOCK')
                toast.success('Bài tuyển dụng đã được ẩn');
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            <Container>
                <div className={cx('wrapper')}>
                    <h2 className={cx('heading')}>Những bài tuyển dụng bạn đã đăng</h2>
                    <div className={cx('wrapper')}>
                        <Row>
                            {filteredApplyJob &&
                                filteredApplyJob?.map((recruitment) => {
                                    return (
                                        <Col
                                            key={recruitment.id}
                                            lg={3}
                                            md={4}
                                            sm={6}
                                        >
                                            <Card
                                                to={`/recruitmentpage/recruitmentdetail/${recruitment.id}`}
                                                data={recruitment}
                                                deleted={
                                                    <ion-icon name="trash-outline"></ion-icon>
                                                }
                                                titleDeleted="Xóa tin"
                                                handleDelete={handleDelete}
                                                titleBlock="Ẩn tin"
                                                handleBlock={handleBlock}
                                                block={
                                                    <ion-icon name="eye-off-outline"></ion-icon>
                                                }
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
