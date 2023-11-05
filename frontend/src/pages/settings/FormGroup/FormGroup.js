import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';

import Button from '~/components/Button';
import styles from './FormGroup.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

function FormGroup({ unUpdate, label, desc, value, type, setValue }) {
    const dispatch = useDispatch();
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const inputRef = useRef(null);
    const auth = useSelector((state) => state.auth.login?.currentUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = value
        console.log(data)
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
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
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
                                            setValue(value);
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
