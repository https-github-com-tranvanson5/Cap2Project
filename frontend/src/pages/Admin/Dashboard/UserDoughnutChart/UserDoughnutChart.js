import classNames from 'classnames/bind';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import styles from './UserDoughnutChart.module.scss';

const cx = classNames.bind(styles);
ChartJS.register(ArcElement, Tooltip, Legend);

function UserDoughnutChart({ data }) {
    const dataChart = {
        labels: ['Người dùng', 'Nhà Tuyển Dụng'],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                hoverOffset: 4,
            },
        ],
        ...data,
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Thống kê người dùng</h2>
            <Doughnut datasetIdKey="id" data={dataChart} />
            <ul className={cx('total-data')}>
                <li>Người dùng: {data?.datasets[0].data[0]}</li>
                <li>Nhà tuyển dụng: {data?.datasets[0].data[1]}</li>
            </ul>
        </div>
    );
}

export default UserDoughnutChart;
