import React from 'react';
import classNames from 'classnames/bind';
import styles from './RecruiterNews.module.scss';
import Carousel from '~/pages/Home/Slider/Slider';
const cx = classNames.bind(styles);

function ListPostRecruiter() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <h3>Bảng tin</h3>
            </div>
            <div className={cx('slider')}>
                <Carousel />
            </div>
        </div>
    );
}

export default ListPostRecruiter;
