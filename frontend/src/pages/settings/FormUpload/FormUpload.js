import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import images from '~/assets/images';
import Button from '~/components/Button';
import { fetchUpdateProfile } from '~/pages/Accounts/accountsSlice';
import { cloudinaryUploadApi } from '~/services/uploadService';
import styles from './FormUpload.module.scss';

const cx = classNames.bind(styles);

function FormGroup({ label, data }) {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const [visibleControls, setVisibleControls] = useState(false);
    const [file, setFile] = useState({
        preview: '',
        data: '',
    });

    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file);
        };
    }, [file]);

    const handleChangeFile = async (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setFile(img);
        setVisibleControls(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file.data, 'file');

        const res = await cloudinaryUploadApi(formData);

        if (res.image_url) {
            dispatch(fetchUpdateProfile({ imageUrl: res.image_url }));
        }

        setVisibleControls(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-group')}>
                <label className={cx('form-group-lable')} htmlFor="">
                    {label}
                </label>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Row>
                        <Col md={12}>
                            <div className={cx('input-file-block')}>
                                <div className={cx('preview-img-block')}>
                                    {
                                        // Buffer.from(data.data.data).toString('base64')
                                        file.preview ? (
                                            <img
                                                className={cx('preview-img')}
                                                src={file.preview}
                                                alt="avatar"
                                            />
                                        ) : data ? (
                                            <img
                                                className={cx('preview-img')}
                                                src={data}
                                                alt="avatar"
                                            />
                                        ) : (
                                            <img
                                                className={cx('preview-img')}
                                                src={images.avatarDefault}
                                                alt="avatar"
                                            />
                                        )
                                    }
                                </div>
                                <label className={cx('mark')} htmlFor="file">
                                    <input
                                        name="file"
                                        id="file"
                                        ref={inputRef}
                                        className={cx('input', 'input-file')}
                                        type="file"
                                        onChange={handleChangeFile}
                                    />

                                    <div className={cx('input-mark')}>
                                        <ion-icon
                                            className={cx('icon')}
                                            name="camera-outline"
                                        ></ion-icon>
                                    </div>
                                </label>
                            </div>
                        </Col>
                        <Col md={12}>
                            {visibleControls ? (
                                <div className={cx('controls')}>
                                    <Button rounded type="submit">
                                        Lưu
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setFile({
                                                preview: '',
                                                data: '',
                                            });
                                            setVisibleControls(false);
                                        }}
                                        secondary
                                        rounded
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            ) : (
                                ''
                            )}
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    );
}

export default FormGroup;
