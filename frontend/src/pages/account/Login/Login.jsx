import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../FormAccounts.module.scss';
import Button from '~/components/Button';

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
        loginUser(newUser, dispatch, navigate);
    };
    return (
        <section className="'wrapper'">
            <div className="login-title"> Log in</div>
            <form onSubmit={handleLogin}>
                <div className={cx('form-group')}>
                    <div className={cx('label-form-accounts')}>
                        <label>Địa chỉ Email</label>
                    </div>
                    <input
                        className={cx('input-text')}
                        type="text"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/*password */}
                <div className={cx('form-group')}>
                    <div className={cx('label-form-accounts')}>
                        <label htmlFor="password">Mật khẩu</label>
                    </div>
                    <input
                        className={cx('input-text')}
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
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
            <div className="login-register"> Don't have an account yet? </div>
            <Link className="login-register-link" to="/register">
                Register one for free
            </Link>
        </section>
    );
};

export default Login;
