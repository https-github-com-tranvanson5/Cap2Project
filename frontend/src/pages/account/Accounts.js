import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import config from '~/config';
import styles from './Accounts.module.scss';
import images from '~/assets/images';
import Container from './Container/Container';
import Loading from '~/components/Loading/Loading';

const cx = classNames.bind(styles);

export default function Accounts() {
    const isAuth = useSelector((state) => state.auth.login?.isFetching);
    const user = useSelector((state) => state.auth.login?.currentUser);
    // console.log(user);
    const roleUser = user?.roles[0]?.authority;

    if (isAuth) {
        if (roleUser === 'ROLE_ADMIN') {
            return <Navigate to={config.routes.admin} replace />;
        } else if (roleUser === 'ROLE_PM') {
            return <Navigate to={config.routes.recruiter} replace />;
        }
        return <Navigate to={config.routes.home} replace />;
    }

    return (
        <div className={cx('wrapper')}>
            {isAuth == true ? <Loading /> : ''}
            <img
                className={cx('background-img')}
                src={images.backgroundAccounts}
                alt="background-recruitment"
            />

            <Container />
        </div>
    );
}
