import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '../RecruiterSaved/ListRecruitmentPost.module.scss';

import { Col, Container, Row } from 'react-bootstrap';
import Card from '~/components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';

// import { fetchSavedRecruitments } from '~/pages/Accounts/accountsSlice';
import {deleteJobRecruiter, getAllJobsRecruiter } from '~/redux/apiRequest';
import { _LIMIT_PAGE } from '~/config/api';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);
function RecruiterBlock() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const jobListData = useSelector((state) => state.allJob.jobsRecruiter?.allJobsRecruiter);

    useEffect(() => {
        getAllJobsRecruiter(user?.jwt, dispatch);
    }, []);
    console.log('jobListData' , jobListData)
    const filteredApplyJob = jobListData?.content.filter((obj1) => {
        return obj1.jobStatus === 'BLOCK';
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

    const handleActive = async (id) => {
        if (window.confirm('Bạn có muốn công khai bài tuyển dụng này ?')) {
            try {
                await deleteJobRecruiter(user?.jwt , dispatch , id , 'ACTIVE')
                toast.success('Bài tuyển dụng đã được công khai');
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            <Container>
                <div className={cx('wrapper')}>
                    <h2 className={cx('heading')}>Những bài tuyển dụng bạn đã ẩn</h2>
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
                                                active={
                                                    <ion-icon name="earth-outline"></ion-icon>
                                                }
                                                titleActive="Công khai"
                                                handleActive={handleActive}
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

export default RecruiterBlock;

