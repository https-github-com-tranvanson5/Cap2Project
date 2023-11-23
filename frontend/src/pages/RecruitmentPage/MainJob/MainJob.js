import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MainJob.module.scss';

import { Col, Container, Row } from 'react-bootstrap';
import Card from '~/components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import PaginationCOM from '~/pages/Home/BestRecruitment/pagination';

// import { fetchSavedRecruitments } from '~/pages/Accounts/accountsSlice';
import { getAllJobs } from '~/redux/apiRequest';
import { _LIMIT_PAGE } from '~/config/api';
import Search from '../Search/SearchJob/SearchJob';
import Carousel from '~/pages/Home/Slider/Slider';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);
function MainJob() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [jobListData, setJobListData] = useState(
        useSelector((state) => state.allJob.jobs?.allJobs),
    );
    const location = useLocation();

    const searchItem = location.state;

    console.log('searchItem', searchItem?.query);

    useEffect(() => {
        getAllJobs(
            user?.jwt,
            dispatch,
            query || searchItem?.query || '',
            '',
            searchItem?.jobEducation || '',
            searchItem?.jobExperience || '',
            searchItem?.jobPosition || '',
            searchItem?.jobType || '',
            setJobListData,
        );
    }, [query]);

    console.log('query', searchItem?.career);

    return (
        <>
            <Search setQuery={setQuery} />
            <Carousel />
            <Container>
                <div className={cx('wrapper')}>
                    <h2 className={cx('heading')}>Việc làm nổi bật</h2>
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
                                                saved={
                                                    <ion-icon name="heart-outline"></ion-icon>
                                                }
                                                titleSaved="Lưu tin"
                                                to={`/recruitmentpage/recruitmentdetail/${recruitment.id}`}
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
