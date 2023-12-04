import classNames from 'classnames/bind';
import styles from './BestRecruitment.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from '~/components/Card/Card';
// import { jobListSelector } from '~/redux/Selectors/jobSelector';
import config from '~/config';
// import { fetchSavedRecruitments } from '~/pages/Accounts/accountsSlice';

const cx = classNames.bind(styles);

export default function BestRecruitment({ to }) {
    const dispatch = useDispatch();
    const jobListData = '';

    // useEffect(() => {
    //     dispatch(fetchListJob());
    //     dispatch(fetchSavedRecruitments());
    // }, []);

    return (
        <Container>
            {jobListData.length ? (
                <div className={cx('wrapper')}>
                    <div className={cx('heading')}>
                        <h3 className={cx('heading-job')}>Việc làm mới nhất</h3>
                        <Link
                            className={cx('heading-more')}
                            to={config.routes.recruitmentpage}
                        >
                            Hiển thị thêm
                        </Link>
                    </div>
                    <Row>
                        {jobListData &&
                            jobListData.map((recruitment) => {
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
        </Container>
    );
}
