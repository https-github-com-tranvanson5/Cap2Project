import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { getChartAdminApi } from '~/services/chartService';
import StatisticalLinesChart from './StatisticalLinesChart/StatisticalLinesChart';
import UserDoughnutChart from './UserDoughnutChart/UserDoughnutChart';

import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);

function Dashboard() {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const chartData = getChartAdminApi();

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
                <Col md={4}>
                    <UserDoughnutChart data={chartData.doughnut} />
                </Col>
                <Col md={8}>
                    <StatisticalLinesChart data={chartData.lines} />
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;
