import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MainJob.module.scss';

import { Col, Container, Row } from 'react-bootstrap';
import Card from '~/components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListJob } from '~/pages/Home/homeSlice';
import { jobListSelector } from '~/redux/Selectors/jobSelector';
import PaginationCOM from '~/pages/Home/BestRecruitment/pagination';
import { _LIMIT_PAGE } from '~/config/apis';

const cx = classNames.bind(styles);
function MainJob() {
    const [jobsItem, setjobsItem] = useState([]);
    const dispatch = useDispatch();
    const jobListData = useSelector(jobListSelector);

    useEffect(() => {
        dispatch(fetchListJob());
        if (jobListData.length > 0) {
            const jobs = jobListData.slice(0, _LIMIT_PAGE);
            setjobsItem(jobs);
        }
    }, [JSON.stringify(jobListData)]);

    return (
        <Container>
            <div className={cx('wrapper')}>
                <h2 className={cx('heading')}>Việc làm nổi bật</h2>
                {jobListData.length ? (
                    <div className={cx('wrapper')}>
                        <Row>
                            {jobsItem &&
                                jobsItem.map((recruitment) => {
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
                                            ></Card>
                                        </Col>
                                    );
                                })}
                        </Row>
                    </div>
                ) : (
                    ''
                )}
                <PaginationCOM items={jobListData} setjobsItem={setjobsItem} />
            </div>
        </Container>
    );
}

export default MainJob;
