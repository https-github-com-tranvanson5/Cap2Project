import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import Button from '~/components/Button';
import { fetchUploadImage } from '~/pages/Accounts/accountsSlice';
import styles from './FormGroup.module.scss';

const cx = classNames.bind(styles);

function FormGroup({ unUpdate, label, desc, value, type }) {
    const dispatch = useDispatch();
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const [file, setFile] = useState({ preview: '', data: '' });
    const inputRef = useRef(null);

    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file);
        };
    }, [file]);

    const handleChangeFile = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setFile(img);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'file') {
            // console.log('file', file);
            // let formData = new FormData();
            // formData.append('file', file.data);
            // console.log('form data:', formData);
            dispatch(fetchUploadImage(type, file));
        } else {
            dispatch(fetchUploadImage(type, inputValue));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-group')}>
                <Row>
                    <Col className={cx('form-group-left')} md={7}>
                        <label className={cx('form-group-lable')} htmlFor="">
                            {label}
                        </label>
                        <input
                            ref={inputRef}
                            className={cx('input')}
                            type={type}
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                            }}
                            disabled
                        />
                        <p className={cx('form-group-desc')}>{desc}</p>
                    </Col>
                    {unUpdate ? (
                        ''
                    ) : (
                        <Col
                            className={cx('form-group-right')}
                            md={{
                                span: 4,
                                offset: 1,
                            }}
                        >
                            {visibleUpdate ? (
                                <>
                                    <Button
                                        onClick={handleSubmit}
                                        rounded
                                        type="submit"
                                    >
                                        Lưu
                                    </Button>
                                    <Button
                                        secondary
                                        rounded
                                        onClick={() => {
                                            setVisibleUpdate(false);
                                            setInputValue(value);
                                            inputRef.current.disabled = true;
                                        }}
                                    >
                                        Hủy
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    type="button"
                                    secondary
                                    onClick={() => {
                                        setVisibleUpdate(true);
                                        inputRef.current.disabled = false;
                                        inputRef.current.focus();
                                    }}
                                    rounded
                                >
                                    Chỉnh sửa
                                </Button>
                            )}
                        </Col>
                    )}
                </Row>
            </div>
        </div>
    );
}

export default FormGroup;
