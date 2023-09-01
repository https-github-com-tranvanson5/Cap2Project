import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './BlogDetail.module.scss';

import { db } from '~/config/Firebase/firebase';
import Comment from '../Comment/Comment';
import UserComments from '../Comment/UserComments';

import { accountsDataSelector } from '~/redux/Selectors/authSelector';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);

function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState('');
    const [loading, setLoading] = useState(true);
    const userData = useSelector(accountsDataSelector);

    useEffect(() => {
        id && getBlogDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const getBlogDetail = async () => {
        const blogRef = collection(db, 'blogs');
        const docRef = doc(db, 'blogs', id);
        const blogDetail = await getDoc(docRef);

        setBlog(blogDetail.data());
        const relatedBlogsQuery = query(blogRef);
        const relatedBlogSnapshot = await getDocs(relatedBlogsQuery);
        relatedBlogSnapshot.forEach((doc) => {
            relatedBlogs.push({ id: doc.id, ...doc.data() });
        });
        setRelatedBlogs(relatedBlogs);
        setComments(
            blogDetail.data().comments ? blogDetail.data().comments : [],
        );
        setLoading(false);
    };

    const handleComment = async (e) => {
        e.preventDefault();
        comments.push({
            createdAt: Timestamp.fromDate(new Date()),
            userData,
            name: userData.fullname,
            body: userComment,
        });
        toast.success('Comment posted successfully');
        await updateDoc(doc(db, 'blogs', id), {
            ...blog,
            comments,
            timestamp: serverTimestamp(),
        });
        setComments(comments);
        setUserComment('');
    };

    // console.log('relatedQuizs', relatedBlogs);
    return loading ? (
        <Loading />
    ) : (
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
                            {blog?.title}
                        </div>
                        <div className={cx('content-detail')}>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: blog?.content,
                                }}
                            ></span>
                        </div>
                    </div>
                </div>
                <Comment
                    userComment={userComment}
                    setUserComment={setUserComment}
                    handleComment={handleComment}
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
