import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Card from '~/components/Card/Card';
// import { accountsDataSelector } from '~/redux/Selectors/authSelector';
// import { recruiterJobListSelector } from '~/redux/Selectors/recruiterSelector';
import { fetchRecruiterDetail } from '../recruiterSlice';

import styles from './ListRecruitmentPost.module.scss';

const cx = classNames.bind(styles);

function ListRecruitmentPost() {

    return (
        <div className={cx('wrapper')}>
            hello
        </div>
    );
}

export default ListRecruitmentPost;
