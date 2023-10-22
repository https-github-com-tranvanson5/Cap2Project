import moment from 'moment/moment';
import React from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './RecruiterPost.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';
import { getAllProvinces, getAllDistricts } from '~/helper/geomap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import DropDown from '~/components/Input/DropDown/DropDown';
// import { fetchPostJobDesc, homeSlice } from '~/pages/Home/homeSlice';

import { fetchPostJobDesc, recruiterSlice } from '../recruiterSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextEditor from '~/pages/Blogs/EditorContent';
import { postJob } from '~/redux/apiRequest';
const cx = classNames.bind(styles);

function RecruiterPost() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [jobExperience, setJobExperience] = useState('');
    const [startSalary, setStartSalary] = useState('');
    const [endSalary, setEndSalary] = useState('');
    const isAuth = useSelector((state) => state.auth.login?.currentUser);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !jobExperience || !startSalary || !endSalary) {
            toast.error('Hãy nhập đầy đủ thông tin');
            return;
        }
        const data = {
            title: title,
            jobExperience: jobExperience,
            startSalary: startSalary,
            endSalary: endSalary,
            id : isAuth.id,
        };
        postJob(data, isAuth?.jwt, dispatch);
    };
    return (
        <div className={cx('wrapper')}>
            <section className={cx('wrapper')}>
                <form onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <div className={cx('label-form-accounts')}>
                            <label htmlFor="fullname">Tiêu đề</label>
                        </div>
                        <div className={cx('input-block')}>
                            <input
                                className={cx('input-text')}
                                type="text"
                                placeholder="Họ và tên của bạn"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        {' '}
                        <div className={cx('label-form-accounts')}>
                            <label>Kinh nghiem</label>
                        </div>
                        <div className={cx('input-block')}>
                            <input
                                className={cx('input-text')}
                                type="text"
                                placeholder="Enter your email"
                                onChange={(e) => setJobExperience(e.target.value)}
                            />{' '}
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        {' '}
                        <div className={cx('label-form-accounts')}>
                            <label htmlFor="email">tien dau tien</label>
                        </div>
                        <div className={cx('input-block')}>
                            <input
                                className={cx('input-text')}
                                type="text"
                                placeholder="Enter your username"
                                onChange={(e) => setStartSalary(e.target.value)}
                            />{' '}
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        {' '}
                        <div className={cx('label-form-accounts')}>
                            <label htmlFor="text">tien cuoi cung</label>
                        </div>
                        <div className={cx('input-block')}>
                            <input
                                className={cx('input-text')}
                                type="text"
                                placeholder="Enter your text"
                                onChange={(e) => setEndSalary(e.target.value)}
                            />{' '}
                        </div>
                    </div>

                    <Button primary rounded type="submit">
                        {' '}
                        Đăng bài{' '}
                    </Button>
                </form>
            </section>
        </div>
    );
}

export default RecruiterPost;
