import classNames from 'classnames/bind';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../FormAccounts.module.scss';
import { fetchLogin } from '../accountsSlice';
import { accountsMessageSelector } from '~/redux/Selectors/authSelector';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function LoginForm() {
    const dispatch = useDispatch();
    const formikRef = useRef(null);
    const messageRef = useRef(null);
    const messageError = useSelector(accountsMessageSelector);

    const handleSubmit = () => {
        const { email, password } = formikRef.current.values;
        if (email && password) {
            const data = { email, password };
            dispatch(fetchLogin(data));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Formik
                innerRef={formikRef}
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={() => {
                    handleSubmit();
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Email không hợp lệ')
                        .required('Mục này không được để trống!'),
                    password: Yup.string()
                        .min(6, 'Mật khẩu phải có ít nhất là 6 ký tự!')
                        .required('Mục này không được để trống!'),
                })}
            >
                <Form>
                    {/* Email */}
                    <div className={cx('form-group')}>
                        <div className={cx('label-form-accounts')}>
                            <label htmlFor="email">Địa chỉ Email</label>
                        </div>
                        <div className={cx('input-block')}>
                            <Field
                                className={cx('input-text')}
                                name="email"
                                type="email"
                                placeholder="Địa chỉ email"
                            />
                        </div>
                        <div className={cx('error-message')}>
                            <ErrorMessage name="email" />
                        </div>
                    </div>

                    {/* Password */}
                    <div className={cx('form-group')}>
                        <div className={cx('label-form-accounts')}>
                            <label htmlFor="password">Mật khẩu</label>
                        </div>
                        <div className={cx('input-block')}>
                            <Field
                                className={cx('input-text')}
                                name="password"
                                type="password"
                                placeholder="Mật khẩu"
                            />
                        </div>
                        <div className={cx('error-message')}>
                            <ErrorMessage name="password" />
                        </div>
                    </div>

                    {/* Hiển thị trạng thái đăng nhập, đăng ký */}
                    <div
                        ref={messageRef}
                        style={{ color: 'red', fontSize: '1.4rem' }}
                        className={cx('error-message')}
                    >
                        {messageError}
                    </div>

                    <Button
                        primary
                        rounded
                        onClick={() => {
                            handleSubmit();
                        }}
                        type="submit"
                        className={cx('button-form')}
                    >
                        <span>ĐĂNG NHẬP</span>
                    </Button>
                </Form>
            </Formik>
        </div>
    );
}

export default LoginForm;
