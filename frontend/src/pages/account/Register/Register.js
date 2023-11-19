import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../redux/apiRequest';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from '../FormAccounts.module.scss';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (!name || !email || !username || !password) {
            toast.error('Hãy nhập đầy đủ thông tin');
            return;
        }
        const newUser = {
            email: email,
            name: name,
            password: password,
            username: username,
        };
        registerUser(newUser, dispatch, navigate);
        toast.success('Tạo tài khoản thành công');
    };
    return (
        <section className={cx('wrapper')}>
            <form onSubmit={handleRegister}>
                <div className={cx('form-group')}>
                    <div className={cx('label-form-accounts')}>
                        <label htmlFor="fullname">Tên của bạn</label>
                    </div>
                    <div className={cx('input-block')}>
                        <input
                            className={cx('input-text')}
                            type="text"
                            placeholder="Họ và tên của bạn"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx('form-group')}>
                    {' '}
                    <div className={cx('label-form-accounts')}>
                        <label>Địa chỉ Email</label>
                    </div>
                    <div className={cx('input-block')}>
                        <input
                            className={cx('input-text')}
                            type="text"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />{' '}
                    </div>
                </div>
                <div className={cx('form-group')}>
                    {' '}
                    <div className={cx('label-form-accounts')}>
                        <label htmlFor="email">Tên đăng nhập</label>
                    </div>
                    <div className={cx('input-block')}>
                        <input
                            className={cx('input-text')}
                            type="text"
                            placeholder="Enter your username"
                            onChange={(e) => setUsername(e.target.value)}
                        />{' '}
                    </div>
                </div>
                <div className={cx('form-group')}>
                    {' '}
                    <div className={cx('label-form-accounts')}>
                        <label htmlFor="password">Mật khẩu</label>
                    </div>
                    <div className={cx('input-block')}>
                        <input
                            className={cx('input-text')}
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />{' '}
                    </div>
                </div>

                <Button primary rounded type="submit">
                    {' '}
                    Tạo tài khoản{' '}
                </Button>
            </form>
        </section>
    );
};

export default Register;
