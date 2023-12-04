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

const options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            },
        }],
    },
    elements: {
        line: {
            fill: true, // Set to true to fill the area under the line
        },
    },
};

function StatisticalLinesChart({ dataChart }) {
    return (
        <div className={cx('wrapper')}>
            <Line options={options} data={dataChart} />
        </div>
    );
}

export default StatisticalLinesChart;
