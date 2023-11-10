import classNames from 'classnames/bind';

import MainJob from './MainJob/MainJob';
import Carousel from '../Home/Slider/Slider';
import styles from './RecruimentPage.module.scss';
import Search from './Search/SearchJob/SearchJob';

const cx = classNames.bind(styles);

export default function RecruitmentPage() {
    return (
        <div className={cx('wrapper')}>
            <MainJob />
        </div>
    );
}
