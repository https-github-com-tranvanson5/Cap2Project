import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Card from '~/components/Card/Card';
import { getCv } from '~/redux/apiRequest';
import classNames from 'classnames/bind';
import styles from './ManageCv.module.scss';
import CardBlog from '~/components/CardBlog/CardBlog';
import CardCv from '~/components/CardCv/CardCv';

const cx = classNames.bind(styles);

export default function ManageCV() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [cvData, setCvData] = useState(
        useSelector((state) => state.cvData.data?.cv),
    );
    useEffect(() => {
        getCv(user?.jwt, dispatch);
    }, []);
    console.log(
        'string',
        cvData.content
    );
    const string = cvData.content.map((content) => {
        return content.content;
    });
    const jsonData = string.map((item) => JSON.parse(item));

    console.log('jsonData', jsonData);
    return (
        <Container>
            <div className={cx('wrapper')}>
                <h2 className={cx('heading')}>CV của bạn</h2>
                <div className={cx('wrapper')}>
                    <Row>
                        {cvData.content &&
                            cvData.content?.map((cv) => {
                                return (
                                    <Col
                                        key={cv.id}
                                        lg={3}
                                        md={4}
                                        sm={6}
                                    >
                                        <CardCv
                                            data={cv}
                                            saved={
                                                <ion-icon name="heart-outline"></ion-icon>
                                            }
                                            titleSaved="Lưu tin"
                                            to={`/cv/${cv.id}` }
                                        ></CardCv>
                                    </Col>
                                );
                            })}
                    </Row>
                </div>
            </div>
        </Container>
    );
}
