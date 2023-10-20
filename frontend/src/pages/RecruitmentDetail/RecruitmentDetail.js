import React from 'react';
import classNames from 'classnames/bind';

import RelatedJob from './RelatedJob/RelatedJob';
import styles from './RecruitmentDetail.module.scss';
import DetailInfor from '~/pages/RecruitmentDetail/DetailInfor/DetailInfor';
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
                    <RelatedJob></RelatedJob>
                </div>
            </div>
        </>
    );
}
export default RecruitmentDetail;
