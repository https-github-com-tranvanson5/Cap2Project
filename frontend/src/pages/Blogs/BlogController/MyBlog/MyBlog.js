import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './MyBlog.module.scss';
import classNames from 'classnames/bind';
import CardBlog from '~/components/CardBlog/CardBlog';
import Loading from '~/components/Loading/Loading';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getMyBlog } from '~/redux/apiRequest';
const cx = classNames.bind(styles);
function ContentBlog({ data, to }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myBlog = useSelector((state) => state.allBlog.blogRecruiter?.allBLogRecruiter);
    useEffect(() => {
        getMyBlog(user?.jwt, dispatch);
    }, []);
    console.log('myBlog',myBlog)
    return  (
        <div className={cx('wrapper')}>
            <Container>
                {myBlog?.length ? (
                    <div className={cx('container-left')}>
                        <div className={cx('heading')}>
                            <h2 className={cx('header-title')}>
                                Bài viết nổi bật
                            </h2>
                            <p className={cx('sub-heading')}>
                                Tổng hợp các bài viết chia sẻ về kinh nghiệm học
                                tập, ôn tập, phỏng vấn liên quan về nghề nghiệp
                            </p>
                        </div>
                        <div className={cx('content-topic')}>
                            <div className={cx('content-blog')}>
                                <Row>
                                    {myBlog.slice(0, 8).map((myBlog, index) => {
                                        return (
                                            <Col>
                                                <CardBlog
                                                    data={myBlog}
                                                    // handleDelete={handleDelete}
                                                    iconDelete={myBlog}
                                                    iconRepair={myBlog}
                                                ></CardBlog>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </div>
                            <div className={cx('title-related')}>
                                <h3>Các chủ đề được đề xuất</h3>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </Container>
        </div>
    );
}

export default ContentBlog;
