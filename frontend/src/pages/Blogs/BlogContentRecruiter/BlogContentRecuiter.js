import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

import styles from './BlogContentRecruiter.module.scss';
import CardBlog from '~/components/CardBlog/CardBlog';
import Loading from '~/components/Loading/Loading';
import { db } from '~/config/Firebase/firebase';


const cx = classNames.bind(styles);
function ContentBlog() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const blogCollectionRef = collection(db, 'blogs');

    useEffect(() => {
        onSnapshot(blogCollectionRef, (snapshot) => {
            setBlogs(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        viewing: false,
                        ...doc.data(),
                    };
                }),
            );
            setLoading(false);
        });
    }, [blogs, blogCollectionRef]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure wanted to delete that blog ?')) {
            try {
                await deleteDoc(doc(db, 'blogs', id));
                toast.success('Blog deleted successfully');
            } catch (err) {
                console.log(err);
            }
        }
    };
    return loading ? (
        <Loading />
    ) : (
        <div className={cx('wrapper')}>
            <Container>
                {blogs.length ? (
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
                                    {blogs.slice(0, 8).map((blogs, index) => {
                                        return (
                                            <Col>
                                                <CardBlog
                                                    data={blogs}
                                                    handleDelete={handleDelete}
                                                    iconDelete={blogs}
                                                    iconRepair={blogs}
                                                    // titlRepair="Sửa"
                                                    // titlDelete="Xóa"
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
