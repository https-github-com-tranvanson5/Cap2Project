import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import images from '~/assets/images';
import ModalPost from '../Modal/ModalDeleted/ModalDeleted';

import styles from './CardCv.module.scss';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const cx = classNames.bind(styles);

export default function CardCv({
    data,
    to,
    deleted,
    repair,
    saved,
    titleDeleted = '',
    titleRepair = '',
    titleSaved = '',
    handleClick,
    status,
    handleDelete,
    block,
    titleBlock,
    active,
    titleActive,
    handleBlock,
    handleActive,
    onDelete,
    id,
}) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={cx('wrapper')}>
            {/* /id */}
            <Link className={cx('link')} to={to}>
                <div className={cx('image-block')}>
                    <img
                        className={cx('image')}
                        src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/dbc58474469783.5c30ea744002d.png"
                        alt="anh nha tuyen dung"
                    />
                </div>
                <div className={cx('information')}>
                    {/* <div className={cx('title')}>{data?.title}</div> */}
                    {/* {data?.description && (
                        <div className={cx('description')}>
                            {data?.description || data?.jobDescription}
                        </div>
                    )} */}
                    {/* {data.recruiter_jobs?.fullname && (
                        <div className={cx('description')}>
                            {data.recruiter_jobs.fullname}
                        </div>
                    )} */}
                    <div className={cx('subdesc')}>
                        <div className={cx('subdesc-item subdesc-left')}>
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

            {/* <div className={cx('subdesc-control')}>
                <div
                    onClick={() => handleDelete(data.id)}
                    className={cx('subdesc-text')}
                >
                    {deleted && (
                        <span className={cx('subdesc-text')}>{deleted}</span>
                    )}
                    <span>{titleDeleted}</span>
                </div>
                <div
                    onClick={() => handleBlock(data.id)}
                    className={cx('subdesc-text')}
                >
                    {block && (
                        <span className={cx('subdesc-text')}>{block}</span>
                    )}
                    <span>{titleBlock}</span>
                </div>
                <div
                    onClick={() => handleActive(data.id)}
                    className={cx('subdesc-text')}
                >
                    {active && (
                        <span className={cx('subdesc-text')}>{active}</span>
                    )}
                    <span>{titleActive}</span>
                </div>
                <Link
                    to={`/recruiter/recruiterpostjob/${data.id}`}
                    className={cx('subdesc-repair')}
                >
                    <div className={cx('subdesc-text-repair')}>
                        {repair && (
                            <span className={cx('subdesc-text')}>{repair}</span>
                        )}
                        <span>{titleRepair}</span>
                    </div>
                </Link>
            </div> */}
        </div>
    );
}
