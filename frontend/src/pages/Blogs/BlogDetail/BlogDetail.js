
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './BlogDetail.module.scss';

import Comment from '../Comment/Comment';
import UserComments from '../Comment/UserComments';
import Loading from '~/components/Loading/Loading';
import { getBlog } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

function BlogDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const blogDetailData = useSelector((state) => state.allBlog.blogs?.blog);
    const isAuth = useSelector((state) => state.auth.login?.currentUser);
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState('');
    const [loading, setLoading] = useState(true);
    const userData = '';

    useEffect(() => {
        getBlog(isAuth?.jwt , dispatch, id);
    }, []);

    console.log(blogDetailData)


    // console.log('relatedQuizs', relatedBlogs);
    return (
        <Container>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('user')}>
                        <div className={cx('user-infor')}>
                            <div className={cx('username')}>
                                {userData.fullname}
                            </div>
                            <div className={cx('icon')}>
                                <div className={cx('icon-heart')}>
                                    <span>
                                        <ion-icon name="heart-outline"></ion-icon>
                                    </span>
                                    <span className={cx('heart-reaction')}>
                                        12
                                    </span>
                                </div>
                                <div className={cx('icon-comment')}>
                                    <span>
                                        <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                                    </span>
                                    <span className={cx('comment-reaction')}>
                                        {comments?.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('content')}>
                        <div className={cx('content-header')}>
                            {blogDetailData?.title}
                        </div>
                        <div className={cx('content-detail')}>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: blogDetailData?.content,
                                }}
                            ></span>
                        </div>
                    </div>
                </div>
                <Comment
                    userComment={userComment}
                    setUserComment={setUserComment}
                    // handleComment={handleComment}
                />
                <div className={cx('scroll')}>
                    <h4 className={cx('small-title')}>
                        {comments?.length} bình luận
                    </h4>
                    <div>
                        {comments?.map((comment) => (
                            <UserComments {...comment} />
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default BlogDetail;
