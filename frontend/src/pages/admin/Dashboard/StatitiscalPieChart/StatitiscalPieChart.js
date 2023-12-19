import classNames from 'classnames/bind';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import styles from './UserDoughnutChart.module.scss';

const cx = classNames.bind(styles);
ChartJS.register(ArcElement, Tooltip, Legend);

function StatitiscalPieChart({ dataChart }) {
    const defaultData = {
        labels: ['Unkown'],
        datasets: [
            {
                label: '',
                data: [1],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className={cx('wrapper')}>
            <Pie datasetIdKey="id" data={dataChart||defaultData} />
        </div>
    );
}

export default StatitiscalPieChart;
