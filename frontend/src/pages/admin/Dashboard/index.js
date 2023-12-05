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

const cx = classNames.bind(styles);

function Dashboard() {
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState({});
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userList = useSelector((state) => state.allUser.users?.allUsers);
    console.log(userList);

    useEffect(() => {
        const chartData = getAllUsers(user?.jwt, dispatch);

        if (chartData) {
            chartData
                .then((data) => setChartData(data.data))
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Row>
                {/* <Col md={4}>
                    <UserDoughnutChart />
                </Col>
                <Col md={8}>
                    <StatisticalLinesChart/>
                </Col> */}
                <UserStatiscal/>
            </Row>
        </div>
    );
}

export default Dashboard;
