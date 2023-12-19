import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './MyBlog.module.scss';
import classNames from 'classnames/bind';
import CardBlog from '~/components/CardBlog/CardBlog';
import Loading from '~/components/Loading/Loading';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { deleteBlog, getMyBlog } from '~/redux/apiRequest';
import Button from '~/components/Button';
import config from '~/config';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);
function MyBlog({ data, to }) {
    const dispatch = useDispatch();
    const id = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const myBlog = useSelector(
        (state) => state.allBlog.blogRecruiter?.allBLogRecruiter,
    );
    console.log('myblog', myBlog);
    useEffect(() => {
        getMyBlog(user?.jwt, dispatch);
    }, []);
    const filtered = myBlog?.content.filter((obj1) => {
        return obj1.status === 'ACTIVE';
    });
    // console.log('filter id' ,filtered)
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có muốn xóa bài tuyển dụng này ?')) {
            try {
                await deleteBlog(user?.jwt, dispatch, id);
                toast.success('Bài tuyển dụng đã được xóa');
            } catch (err) {
                console.log(err);
            }
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Container>
                {myBlog?.content.length ? (
                    <div className={cx('container-left')}>
                        <div className={cx('heading')}>
                            <Row>
                                <Col md={9}>
                                    <h2 className={cx('header-title')}>
                                        Bài viết của bạn
                                    </h2>
                                    <p className={cx('sub-heading')}>
                                        Tổng hợp các bài viết chia sẻ về kinh
                                        nghiệm học tập, ôn tập, phỏng vấn liên
                                        quan về nghề nghiệp
                                    </p>
                                </Col>
                                <Col md={3}>
                                    <Button
                                        to={config.routes.postblog}
                                        primary
                                        rounded
                                        leftIcon={
                                            <ion-icon name="add-outline"></ion-icon>
                                        }
                                    >
                                        Viết Blogs
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        <div className={cx('content-topic')}>
                            <div className={cx('content-blog')}>
                                <Row>
                                    {filtered &&
                                        filtered
                                            .slice(0, 8)
                                            .map((myBlog, index) => {
                                                return (
                                                    <Col>
                                                        <CardBlog
                                                            data={myBlog}
                                                            handleDelete={
                                                                handleDelete
                                                            }
                                                            iconDelete={myBlog}
                                                            iconRepair={myBlog}
                                                        ></CardBlog>
                                                    </Col>
                                                );
                                            })}
                                </Row>
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

export default MyBlog;
