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
    },
};

// ... (imports and styling)

function StatisticalLinesChart({ dataChart = {} }) {
    const defaultData = {
        labels: [],
        datasets: [
            {
                label: 'Unknown',
                data: [],
                borderColor: '#4bc0c0',
                backgroundColor: '#a4f5f5',
            },
        ],
    };

    // Check if dataChart and datasets are defined
    const hasData = dataChart && dataChart.datasets;

    return (
        <div className={cx('wrapper')}>
            {/* Check if dataChart is defined and has datasets before rendering Line component */}
            {hasData ? (
                <Line options={options} data={dataChart} />
            ) : (
                <Line options={options} data={defaultData} />
            )}
        </div>
    );
}

export default StatisticalLinesChart;
