import classNames from 'classnames/bind';

import MainJob from './MainJob/MainJob';
import Search from './Search/SearchJob/Search';
import Carousel from '../Home/Slider/Slider';
import styles from './RecruitmentPage.module.scss';

const cx = classNames.bind(styles);

export default function RecruitmentPage() {
    return (
        <div className={cx('wrapper')}>
            <Search />
            <Carousel />
            <MainJob />
        </div>
    );
}
