import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import styles from './BlogContent.module.scss';
import CardBlog from '~/components/CardBlog/CardBlog';
import Loading from '~/components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlog } from '~/redux/apiRequest';
import Button from '~/components/Button';
import config from '~/config';

const cx = classNames.bind(styles);
function ContentBlog({ data, to }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const isAuth = useSelector((state) => state.auth.login?.currentUser);
    const blog = useSelector((state) => state.allBlog.blogs?.allBlogs);

    useEffect(() => {
        getAllBlog(isAuth?.jwt, dispatch);
    }, []);
    console.log(blog);

    return  (
        <div className={cx('wrapper')}>
            <Container>
                {blog?.content.length ? (
                    <div className={cx('container-left')}>
                        <div className={cx('heading')}>
                            <Row>
                                <Col md={9}>
                                    <h2 className={cx('header-title')}>
                                        Bài viết nổi bật
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
                                    {blog?.content.slice(0, 8).map((blog, index) => {
                                        return (
                                            <Col>
                                                <CardBlog
                                                    data={blog}
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
