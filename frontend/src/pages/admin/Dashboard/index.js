import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { getChartAdminApi } from '~/services/chartService';
import StatisticalLinesChart from './StatisticalLinesChart/StatisticalLinesChart';
import StatitiscalPieChart from './StatitiscalPieChart/StatitiscalPieChart';

import styles from './Dashboard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '~/redux/apiRequest';
import UserStatiscal from './UserStatistical/UserStatiscal';
import BlogStatistical from "~/pages/admin/Dashboard/BlogStatitiscal/BlogStatistical";
import JobStatitiscal from '~/pages/admin/Dashboard/JobStatitiscal/JobStatitiscal';
import CardRanking from './Card/CardRanking';

const cx = classNames.bind(styles);

function Dashboard() {
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState({});
    const user = useSelector((state) => state.auth.login?.currentUser);
    // const userList = useSelector((state) => state.allUser.users?.allUsers);
    // console.log(userList);

    // useEffect(() => {
    //     const chartData = getAllUsers(user?.jwt, dispatch);

    //     if (chartData) {
    //         chartData
    //             .then((data) => setChartData(data.data))
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }
    // }, []);

    return (
        <div className={cx('wrapper')}>
            <Row>
                <UserStatiscal />
            </Row>
            <Row>
                <BlogStatistical />
            </Row>
            {/* <Row>
                <JobStatitiscal />
            </Row> */}
        </div>
    );
}

export default Dashboard;
