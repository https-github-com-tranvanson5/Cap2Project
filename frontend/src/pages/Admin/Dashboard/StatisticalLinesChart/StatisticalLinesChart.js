import classNames from 'classnames/bind';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import styles from './StatisticalLinesChart.module.scss';

const cx = classNames.bind(styles);
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        // title: {
        //     display: true,
        //     text: 'Chart.js Line Chart',
        // },
    },
};

function StatisticalLinesChart({ data }) {
    console.log('data-line:', data);

    const dataChart = {
        labels: data?.jobCount.map((item) => item.month),
        datasets: [
            {
                label: 'Thống kê tuyển dụng',
                data: data?.jobCount.map((item) => item.count),
                borderColor: '#4bc0c0',
                backgroundColor: '#a4f5f5',
            },
        ],
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Thống kê tổng quan hệ thống</h2>
            <Line options={options} data={dataChart} />
        </div>
    );
}

export default StatisticalLinesChart;
