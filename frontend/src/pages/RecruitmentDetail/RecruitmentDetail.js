import React from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './RecruitmentDetail.module.scss';

import DetailInfor from '~/pages/RecruitmentDetail/DetailInfor/DetailInfor';
import Loading from '~/components/Loading/Loading';
import { isLoadingRecruitmentSelector } from '~/redux/Selectors/recruitmentDetail';
import Search from '../RecruitmentPage/Search/SearchJob/SearchJob';

const cx = classNames.bind(styles);
function RecruitmentDetail() {
    // const isLoading = useSelector(isLoadingRecruitmentSelector);
    return (
        <>
            {/* {isLoading && <Loading />} */}
            <div className={cx('wrapper')}>
                <Search leftIcon></Search>
                <div className={cx('container')}>
                    <DetailInfor></DetailInfor>
                </div>
            </div>
        </>
    );
}
export default RecruitmentDetail;
