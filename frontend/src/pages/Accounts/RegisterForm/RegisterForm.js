import classNames from 'classnames/bind';
import styles from '../FormAccounts.module.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRegister } from '../accountsSlice';
import { accountsMessageSelector } from '~/redux/Selectors/authSelector';
import Button from '~/components/Button';
import { fetchRegisterRecruiter } from '~/pages/Admin/adminSlice';
import { messageAdminAddAccountSelector } from '~/redux/Selectors/adminSelector';

const cx = classNames.bind(styles);

function RegisterForm({ adminAddAccountForm }) {
    const dispatch = useDispatch();

    const formikRef = useRef(null);
    const messageRef = useRef(null);
    const messageError = useSelector(accountsMessageSelector);
    const messageErrorAdminAddAccount = useSelector(
        messageAdminAddAccountSelector,
    );

    const handleSubmit = () => {
        if (formikRef.current.isSubmitting) {
            if (adminAddAccountForm) {
                // console.log('click - adminAddAccountForm');
                dispatch(fetchRegisterRecruiter(formikRef.current.values));
            } else {
                dispatch(fetchRegister(formikRef.current.values));
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Formik
                innerRef={formikRef}
                initialValues={{
                    fullname: '',
                    email: '',
                    password: '',
                    passwordConfirmation: '',
                }}
                onSubmit={() => {
                    handleSubmit();
                }}
                validationSchema={Yup.object({
                    fullname: Yup.string().required(
                        'Mục này không được để trống!',
                    ),
                    email: Yup.string()
                        .email('Email không hợp lệ')
                        .required('Mục này không được để trống!'),
                    password: Yup.string()
                        .min(6, 'Mật khẩu phải có ít nhất là 6 ký tự!')
                        .required('Mục này không được để trống!'),
                    passwordConfirmation: Yup.string()
                        .oneOf(
                            [Yup.ref('password'), null],
                            'Mật khẩu không trùng khớp!',
                        )
                        .required('Mục này không được để trống!'),
                })}
            >
                <Form>
                    {/* Full name */}
                    <div className={cx('form-group')}>
                        <div className={cx('label-form-accounts')}>
                            {adminAddAccountForm ? (
                                <label htmlFor="fullname">
                                    Tên doanh nghiệp?
                                </label>
                            ) : (
                                <label htmlFor="fullname">Tên của bạn?</label>
                            )}
                        </div>
                        <div className={cx('input-block')}>
                            <Field
                                className={cx('input-text')}
                                name="fullname"
                                type="text"
                                placeholder="Họ và tên của bạn"
                            />
                        </div>
                        <div className={cx('error-message')}>
                            <ErrorMessage name="fullname" />
                        </div>
                    </div>

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
                    <div className={cx('form-group')}>
                        <div className={cx('input-block')}>
                            <Field
                                className={cx('input-text')}
                                name="passwordConfirmation"
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                            />
                        </div>
                        <div className={cx('error-message')}>
                            <ErrorMessage name="passwordConfirmation" />
                        </div>
                    </div>

                    {/* Hiển thị trạng thái đăng nhập, đăng ký */}
                    <div
                        ref={messageRef}
                        style={{ color: 'red', fontSize: '1.4rem' }}
                        className={cx('error-message')}
                    >
                        {adminAddAccountForm
                            ? messageErrorAdminAddAccount
                            : messageError}
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
                        {adminAddAccountForm ? (
                            <span>THÊM TÀI KHOẢN</span>
                        ) : (
                            <span>ĐĂNG KÝ</span>
                        )}
                    </Button>
                </Form>
            </Formik>
        </div>
    );
}

export default RegisterForm;
