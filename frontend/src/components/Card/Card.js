import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import { fetchDeletedJobDesc } from '~/pages/Recruiter/recruiterSlice';
import { accountsDataSelector } from '~/redux/Selectors/authSelector';
import ModalPost from '../Modal/ModalDeleted/ModalDeleted';

import styles from './Card.module.scss';

const cx = classNames.bind(styles);

export default function Card({
    data,
    to,
    deleted,
    repair,
    saved,
    titleDeleted = '',
    titleRepair = '',
    titleSaved = '',
    onDelete,
    id,
}) {
    const [show, setShow] = useState(false);
    const userData = useSelector(accountsDataSelector);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const handleDeletedPost = (id) => {
        dispatch(fetchDeletedJobDesc(data.id));
        // toast.success('Xoá bài thành công', toastifyOptions);
        console.log('Mess:', data);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={cx('wrapper')}>
            {/* /id */}
            <Link
                className={cx('link')}
                to={`/recruitmentpage/recruitmentdetail/${data.id}`}
            >
                <div className={cx('image-block')}>
                    {data?.thumbnail ? (
                        <img
                            className={cx('image')}
                            src={data?.thumbnail}
                            alt="anh nha tuyen dung"
                        />
                    ) : (
                        <img
                            className={cx('image')}
                            src={images.recruitmentCard}
                            alt="anh nha tuyen dung"
                        />
                    )}
                </div>
                <div className={cx('information')}>
                    <div className={cx('title')}>{data?.title}</div>
                    {data?.description && (
                        <div className={cx('description')}>
                            {data?.description}
                        </div>
                    )}
                    {data.recruiter_jobs?.fullname && (
                        <div className={cx('description')}>
                            {data.recruiter_jobs.fullname}
                        </div>
                    )}
                    <div className={cx('subdesc')}>
                        <div className={cx('subdesc-item subdesc-left')}>
                            <div className={cx('subdesc-text')}>
                                <ion-icon name="cash-outline"></ion-icon>
                                <span>{data?.salary}</span>
                            </div>
                            <div className={cx('subdesc-text')}>
                                <ion-icon name="location-outline"></ion-icon>
                                <span>{data?.location}</span>
                            </div>
                            <div className={cx('subdesc-item subdesc-right')}>
                                <div className={cx('subdesc-text')}>
                                    <ion-icon name="timer-outline"></ion-icon>
                                    <span>{data?.createAt}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            {/* convert to button  */}
            <ModalPost
                handleClose={handleClose}
                show={show}
                onActionRequest={handleDeletedPost}
            />

            <div className={cx('subdesc-control')}>
                {data.recruiterId === userData.id && (
                    <>
                        <div
                            onClick={handleShow}
                            className={cx('subdesc-text')}
                        >
                            {deleted && (
                                <span className={cx('subdesc-text')}>
                                    {deleted}
                                </span>
                            )}
                            <span>{titleDeleted}</span>
                        </div>
                        <Link to={`/recruiter/recruiterpostjob/${data.id}`}>
                            <div className={cx('subdesc-text-repair')}>
                                {repair && (
                                    <span className={cx('subdesc-text')}>
                                        {repair}
                                    </span>
                                )}
                                <span>{titleRepair}</span>
                            </div>
                        </Link>
                    </>
                )}
                <div className={cx('subdesc-text-save')}>
                    {saved && (
                        <span className={cx('subdesc-text')}>{saved}</span>
                    )}
                    <span>{titleSaved}</span>
                </div>
            </div>
        </div>
    );
}
