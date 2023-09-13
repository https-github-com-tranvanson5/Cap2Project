import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './ModalCv.module.scss';
import Button from '~/components/Button';
import { cloudinaryUploadApi } from '~/services/uploadService';
import { fetchApplyJobs } from '~/pages/RecruitmentDetail/RecruitmentPageSlice';

const cx = classNames.bind(styles);

function Modal({ setOpenModal, data }) {
    const dispatch = useDispatch();
    const [file, setFile] = useState('');
    const [coverLetter, setCoverLetter] = useState('');

    const handleChangeFile = async (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    console.log('job-data:', data);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file, 'file');

        const res = await cloudinaryUploadApi(formData);

        if (res.image_url) {
            const dataApplyJobs = {
                imageUrl: res.image_url,
                jobId: data.id,
                coverLetter,
                recruiterId: data.recruiter_jobs.id,
            };
            dispatch(fetchApplyJobs(dataApplyJobs));
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className={cx('modal')}>
                <div className={cx('modal-overlay')}></div>
                <div className={cx('modal-content')}>
                    <div className={cx('modal-header')}>
                        <h2 className={cx('modal-title')}>
                            Ứng tuyển vị trí:{' '}
                            <span className={cx('text-highlight')}>
                                {data?.title}
                            </span>
                        </h2>
                        <span
                            onClick={() => {
                                setOpenModal(false);
                            }}
                            className={cx('close')}
                        >
                            X
                        </span>
                    </div>
                    <div className={cx('modal-upload')}>
                        <div className={cx('modal-cv')}>
                            <h4>Tải CV lên từ máy tính</h4>
                            <Link to="/cv">
                                <span className={cx('text-highlight')}>
                                    Bạn chưa có CV?
                                </span>
                            </Link>
                        </div>
                        <div className={cx('modal-file')}>
                            {/* <Input>
                            <span>Chọn file</span>
                        </Input> */}
                            {/* <Button primary>Chọn file</Button> */}
                            <input
                                name="file"
                                id="file"
                                onChange={handleChangeFile}
                                type="file"
                            />
                        </div>
                        <div className={cx('modal-letter')}>
                            <h4>Thư giới thiệu:</h4>
                            <textarea
                                value={coverLetter}
                                onChange={(e) => {
                                    setCoverLetter(e.target.value);
                                }}
                                type="text"
                                placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn, lý do làm việc tại công ty này. Đây là cách gây ấn tượng với nhà tuyển dụng nếu bạn có chưa có kinh nghiệm làm việc (hoặc CV không tốt)."
                                className={cx('form-control')}
                            ></textarea>
                        </div>
                        <div className={cx('modal-btn')}>
                            <Button
                                onClick={() => {
                                    setOpenModal(false);
                                }}
                                saveInput
                                small
                            >
                                Thoát
                            </Button>
                            <Button type="submit" primary small>
                                Nộp CV{' '}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Modal;
