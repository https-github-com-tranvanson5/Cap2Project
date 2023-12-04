import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import StatisticalLinesChart from './StatisticalLinesChart/StatisticalLinesChart';
import DropDown from '~/pages/Recruiter/RecruiterPost/DropDown/DropDown';
import UserDoughnutChart from './UserDoughnutChart/UserDoughnutChart';
import { Doughnut } from 'react-chartjs-2';
import {
    countUserByMonth,
    getYearUserMinMax,
    getCountAllUser,
    getCountAllStatusUser,
    getcountUserYear,
    getCountRole,
} from '~/redux/apiRequest';
import styles from './Dashboard.module.scss';
import './dashBoardStyle.css';
import UserStatistical from './userStatistical';

const cx = classNames.bind(styles);
function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    return (
        <div className={cx('wrapper')}>
            <UserStatistical/>
        </div>
    );
}

export default Dashboard;
