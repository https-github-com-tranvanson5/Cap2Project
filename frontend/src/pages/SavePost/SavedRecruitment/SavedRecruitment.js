import React from 'react';
import styles from './SavedRecruitment.module.scss';
import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import Card from '~/components/Card/Card';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jobListSelector } from '~/redux/Selectors/jobSelector';
import SavedPostItem from '../SavedPostItem';
import { fetchDeletedJobDesc, fetchListJob } from '~/pages/Home/homeSlice';

const cx = classNames.bind(styles);
function SavedRecruitment() {
    const dispatch = useDispatch();
    const jobListData = useSelector(jobListSelector);

    useEffect(() => {
        dispatch(fetchListJob());
    }, []);

    const handleDeletedPost = (id) => {
        dispatch(fetchDeletedJobDesc(id));
    };
    return (
        <Container>
            <div className={cx('wrapper')}>
                <div className={cx('heading')}>
                    <h2 className={cx('title-header')}>
                        Tin tuyển dụng đã lưu
                    </h2>
                </div>

                {/* {jobListData.length ? (
                    <div className={cx('wrapper')}>
                        <Row>
                            {jobListData &&
                                jobListData.slice(0, 16).map((recruitment) => {
                                    return (
                                        <SavedPostItem
                                            saved={
                                                <ion-icon name="heart-outline"></ion-icon>
                                            }
                                            titleSaved="Lưu tin"
                                            data={recruitment}
                                        />
                                    );
                                })}
                        </Row>
                    </div>
                ) : (
                    ''
                )} */}
            </div>
        </Container>
    );
}

export default SavedRecruitment;
