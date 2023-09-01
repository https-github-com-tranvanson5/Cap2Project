import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import images from '~/assets/images';

import styles from './Container.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function Container() {
    const [form, setForm] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleChangeForm = () => {
        setForm(!form);
    };

    const handleChangeMainStep = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('center')}>
                {isFormVisible ? (
                    <div
                        className={cx('back-btn')}
                        onClick={() => {
                            handleChangeMainStep();
                        }}
                    >
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </div>
                ) : (
                    ''
                )}

                <div className={cx('header')}>
                    <Link to={config.routes.home}>
                        <img
                            className={cx('logo')}
                            src={images.logoM}
                            alt="logo-test"
                        />
                    </Link>

                    {form ? (
                        <h2 className={cx('heading')}>Đăng nhập vào JobCare</h2>
                    ) : (
                        <h2 className={cx('heading')}>
                            Đăng ký tài khoản JobCare
                        </h2>
                    )}
                </div>

                {isFormVisible === false ? (
                    <div className={cx('content')}>
                        <div
                            className={cx('form-option')}
                            onClick={() => {
                                handleChangeMainStep();
                            }}
                        >
                            <div className={cx('option-icon')}>
                                <ion-icon name="person-outline"></ion-icon>
                            </div>
                            <span className={cx('option-title')}>
                                Sử dụng Email
                            </span>
                        </div>

                        <div className={cx('form-option')}>
                            <div className={cx('option-icon')}>
                                <ion-icon name="logo-google"></ion-icon>
                            </div>
                            <span className={cx('option-title')}>
                                Tiếp tục với Google
                            </span>
                        </div>
                    </div>
                ) : form ? (
                    <LoginForm />
                ) : (
                    <RegisterForm />
                )}

                {form ? (
                    <div className={cx('dont-have-account')}>
                        <span>Bạn chưa có tài khoản?</span>
                        <span
                            onClick={() => {
                                handleChangeForm();
                            }}
                            className={cx('change-form-btn')}
                        >
                            Đăng ký
                        </span>
                        {form && isFormVisible ? (
                            <div className={cx('change-form-btn')}>
                                Quên mật khẩu?
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                ) : (
                    <div className={cx('dont-have-account')}>
                        <span>Bạn đã có tài khoản?</span>
                        <span
                            onClick={() => {
                                handleChangeForm();
                            }}
                            className={cx('change-form-btn')}
                        >
                            Đăng nhập
                        </span>
                    </div>
                )}

                <div className={cx('accept-term')}>
                    Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng
                    ý với <a href="/">Điều khoản sử dụng</a> của chúng tôi
                </div>
            </div>

            <div className={cx('about')}></div>
        </div>
    );
}

export default Container;
