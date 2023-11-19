import classNames from 'classnames/bind';
import styles from './CardBlog.module.scss';

import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import config from '~/config';
const cx = classNames.bind(styles);
function CardBlog({
    data,
    titlRepair = '',
    handleDelete,
    iconRepair,
    iconDelete,
    titlDelete,
}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <div className={cx('image-block')}>
                    {data?.avatar ? (
                        <img
                            className={cx('image')}
                            src={data?.avatar}
                            alt="anh nha tuyen dung"
                        />
                    ) : (
                        <img
                            className={cx('image')}
                            src={images.recruitmentCard}
                            alt="anh nha tuyen dung"
                        />
                    )}
                    <span className={cx('user-name')}>{data?.username}</span>
                </div>
                <div className={cx('icon-option')}>
                    <span className={cx('save')}>
                        <ion-icon name="bookmark-outline"></ion-icon>
                    </span>
                    <span className={cx('share')}>
                        <ion-icon name="apps-outline"></ion-icon>
                    </span>
                    <div className={cx('subdesc-text')}>
                        <span onClick={() => handleDelete(data.id)}>
                            {' '}
                            {/* <ion-icon name="trash-outline"></ion-icon>  */}
                            {iconDelete && (
                                <ion-icon name="trash-outline"></ion-icon>
                            )}
                            {titlDelete}
                        </span>
                    </div>
                    <Link
                        to={{
                            pathname: `/blog/postblog/${data.id}`,
                        }}
                    >
                        <div className={cx('subdesc-text-repair')}>
                            <div className={cx('subdesc-text-repair')}>
                                {iconRepair && (
                                    <ion-icon name="build-outline"></ion-icon>
                                )}
                                <span>{titlRepair}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <Link
                className={cx('link')}
                to={{ pathname: `blogdetail/${data.id}` }}
            >
                <div className={cx('blog-item')}>
                    <div className={cx('title')}>{data?.title}</div>
                    <div className={cx('content')}>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: data?.content,
                            }}
                        ></span>
                    </div>
                    <div className={cx('subdesc-text')}>
                        <span>
                            <ion-icon name="timer-outline"></ion-icon>
                        </span>
                        <span>{data.timestamp.toDate().toDateString()}</span>
                    </div>
                </div>
            </Link>
            <div className={cx('subdesc-control')}></div>
        </div>
    );
}

export default CardBlog;
