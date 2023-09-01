import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Card from '~/components/Card/Card';
import { accountsDataSelector } from '~/redux/Selectors/authSelector';
import { recruiterJobListSelector } from '~/redux/Selectors/recruiterSelector';
import { fetchRecruiterDetail } from '../recruiterSlice';

import styles from './ListRecruitmentPost.module.scss';

const cx = classNames.bind(styles);

function ListRecruitmentPost() {
    const userData = useSelector(accountsDataSelector);
    const recruiterJobList = useSelector(recruiterJobListSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRecruiterDetail(userData.id));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Container>
                {recruiterJobList.length ? (
                    <Row>
                        {recruiterJobList.map((recruitmentPostDetail) => {
                            return (
                                <Col
                                    key={recruitmentPostDetail.id}
                                    lg={3}
                                    md={4}
                                    sm={6}
                                >
                                    <Card
                                        data={recruitmentPostDetail}
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
                ) : (
                    ''
                )}
            </Container>
        </div>
    );
}

export default ListRecruitmentPost;
