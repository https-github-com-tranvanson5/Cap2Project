import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../FormAccounts.module.scss';
import Button from '~/components/Button';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            password: password,
        };
        loginUser(newUser, dispatch);
        navigate('/');
        toast.success('Đăng nhập thành công');
    };
    return (
        <div className={cx('wrapper')}>
            <section>
                <form onSubmit={handleLogin}>
                    <div className={cx('form-group')}>
                        <div className={cx('label-form-accounts')}>
                            <label htmlFor="email">Tên đăng nhập</label>
                        </div>
                        <div className={cx('input-block')}>
                            <input
                                className={cx('input-text')}
                                type="text"
                                placeholder="Enter your username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('label-form-accounts')}>
                            <label htmlFor="password">Mật khẩu</label>
                        </div>
                        <div className={cx('input-block')}>
                            <input
                                className={cx('input-text')}
                                type="password"
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button
                        primary
                        rounded
                        className={cx('button-form')}
                        type="submit"
                    >
                        <span>ĐĂNG NHẬP</span>
                    </Button>
                </form>
            </section>
        </div>
    );
};

export default Login;
