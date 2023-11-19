import React, { useState } from 'react';
import styles from './SavedRecruitment.module.scss';
import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllApplyJobsCandidate, getAllJobs } from '~/redux/apiRequest';
import SavedPostItem from '../SavedPostItem';

const cx = classNames.bind(styles);
function SavedRecruitment() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.login?.currentUser);
    const applyJobListData = useSelector(
        (state) => state.recruitment.applyJobsCandidate?.allApllyJobsCandidate,
    );
    const [query, setQuery] = useState('');
    const [jobListData, setJobListData] = useState(
        useSelector((state) => state.allJob.jobs?.allJobs),
    );

    useEffect(() => {
        getAllApplyJobsCandidate(auth?.jwt, dispatch);
    }, []);

    useEffect(() => {
        getAllJobs(auth?.jwt, dispatch, query , setJobListData);
    }, []);
    console.log('joblistdata', jobListData);
    console.log('applyJobListData', applyJobListData);
    const filteredApplyJob = jobListData?.content.filter((obj1) => {
        return applyJobListData?.content.some((obj2) => obj2.job === obj1.id);
    });

    console.log('filter' ,filteredApplyJob)

    const applyJob = applyJobListData?.content;

    const candidate = [];

    // Duyệt qua mảng 1
    filteredApplyJob?.forEach((item1) => {
        // Tìm kiếm item1 trong mảng 2
        const item2 = applyJob.find((item2) => item2.job === item1.id);

        // Nếu tìm thấy item2, thì gộp item1 và item2 lại với nhau
        if (item2) {
            candidate.push({
                ...item1,
                ...item2,
            });
        } else {
            // Nếu không tìm thấy item2, thì thêm item1 vào kết quả
            candidate.push(item1);
        }
    });

    console.log('merge', candidate);
    return (
        <Container>
            <div className={cx('wrapper')}>
                <div className={cx('heading')}>
                    <h2 className={cx('title-header')}>
                        Các doanh nghiệp bạn đã apply CV
                    </h2>
                </div>

                {candidate.length ? (
                    <div className={cx('wrapper')}>
                        <Row>
                            {candidate &&
                                candidate.slice(0, 16).map((recruitment) => {
                                    return (
                                        <SavedPostItem
                                            saved={
                                                <ion-icon name="heart-outline"></ion-icon>
                                            }
                                            titleSaved="Lưu tin"
                                            data={recruitment}
                                            status={recruitment.status}
                                            to={`/recruitmentpage/recruitmentdetail/${recruitment.job}`}
                                        />
                                    );
                                })}
                        </Row>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </Container>
    );
}

export default SavedRecruitment;
